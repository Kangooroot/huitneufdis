'use strict';


var mongoose = require('mongoose'),
    Group = mongoose.model('Group'),
    Preparator = mongoose.model('Preparator'),
    Order = mongoose.model('Order');


exports.all_groups = function(req, res) {
    /*Order.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });*/
    Group.find()
    .populate("orders")
    .exec(function(err, task) {
        if (err)
            res.send(err);

        res.json(task);
    });
};


exports.create_group = function(req, res) {

    // On récupère le preparator que l'on va associer aux commandes
    Preparator.findById(req.params.id, function(err, preparator) {

        if(err) res.send(err);

        let totalWeight = 0;
        let orderGroup = [];

        // On récupère toutes les commandes qui ne sont assignées à aucun préparateur
        Order.find({ preparator: null }).populate("products.product").exec(function(err, orders) {

            if(err) res.send(err);

            // Ce tableau d'objets json va associer chaque commande à un barycentre
            let barycentres = [];

            // On inverse les commandes pour les ordonner par ordre de date décroissante
            orders = orders.reverse();

            // On calcule le barycentre de chaque commande
            for(let i = 0; i < orders.length; i++) {

                let barycentre_X = 0;
                let barycentre_Y = 0;

                for(let p = 0; p < orders[i].products.length; p++) {

                    barycentre_X += orders[i].products[p].product.position.X;
                    barycentre_Y += orders[i].products[p].product.position.Y;
                }

                barycentre_X /= orders[i].products.length;
                barycentre_Y /= orders[i].products.length;

                barycentres.push({
                    X: barycentre_X,
                    Y: barycentre_Y,
                    orderId: orders[i]._id,
                    index: i
                })
            }

            let firstOrderBarycentre = null;

            // On va chercher à ajouter une premiere commande au groupement
            for(let i = 0; i < orders.length && orderGroup.length === 0; i++) {

                let orderWeight = 0;

                // On calcule le poids total de la commande en cours
                for(let p = 0; p < orders[i].products.length; p++) {
                    orderWeight += orders[i].products[p].product.weight;
                }

                // Si ce préparateur peut la prendre, on l'ajoute directement
                if(orderWeight < preparator.maxWeight) {
                    orderGroup.push(orders[i]._id);
                    totalWeight += orderWeight;
                    firstOrderBarycentre = barycentres[i];
                }
            }

            // Aucune commande trouvée / ajoutable (par rapport au poids)
            if(orderGroup.length === 0) res.send("Erreur : Pas de commande ajoutable !");
            else {
                // On ordonne les barycentres
                barycentres.sort(function(a, b) {

                    let dist_a = Math.sqrt(Math.pow(a.X - firstOrderBarycentre.X) + Math.pow(a.Y - firstOrderBarycentre.Y));
                    let dist_b = Math.sqrt(Math.pow(b.X - firstOrderBarycentre.X) + Math.pow(b.Y - firstOrderBarycentre.Y));

                    return dist_a - dist_b;
                });

                // On va parcourir toutes nos commandes ordonnées et les ajouter une à une si c'est possible
                for(let i = 0; i < barycentres.length; i++) {

                    let orderWeight = 0;

                    // On calcule le poids total de la commande
                    for(let p = 0; p < orders[barycentres[i].index].products.length; p++) {

                        orderWeight += orders[barycentres[i].index].products[p].product.weight;
                    }

                    // Si on peut l'ajouter et qu'elle n'existe pas déjà, on l'ajoute
                    if(totalWeight + orderWeight < preparator.maxWeight && !orderGroup.includes(barycentres[i].orderId)) {

                        orderGroup.push(barycentres[i].orderId);
                        totalWeight += orderWeight;
                    }
                }

                var new_group = new Group({orders: orderGroup, weight:totalWeight});
                new_group.save(function(err, task) {

                    if (err)
                        res.send(err);

                    Group.populate(task, "orders", function(err, group) {

                        if (err)
                            res.send(err);

                        for(let i = 0; i < group.orders.length; i++) {

                            Order.findOneAndUpdate({_id: group.orders[i]._id}, {preparator: preparator._id}, {new: true}, function(err, task) {

                                if (err)
                                    res.send(err);
                            });
                        }

                        res.json(group);
                    });

                });
            }
        });
    });
};


exports.update_group = function(req, res) {
    Group.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_group = function(req, res) {

    Group.remove({
        _id: req.params.groupId
    }, function(err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Group successfully deleted' });
    });
};