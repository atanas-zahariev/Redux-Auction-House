const { addInCollection, createItem, getAllItem, getItemById, editItem, deleteItem, closeOffer } = require('../services/itemService');
const errorParser = require('../utyl/parser');
const { hasUser } = require('./guard');

const itemControler = require('express').Router();



itemControler.post('/create', hasUser(), async (req, res) => {
    const { title, category, imgUrl, price, description } = req.body;
    const item = {
        title,
        category,
        imgUrl,
        price: Number(price),
        description,
        owner: req.user._id
    }
    try {

        const result = await createItem(item)
        res.json(result)
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message)

    }
});

itemControler.get('/catalog', async (req, res) => {
    let items = await getAllItem();

    items = items.filter(x => x.description != 'isClosed')
    const obj = {
        items,
        user: req.user
    }
    res.json(obj)
});

itemControler.get('/details/:id', async (req, res) => {
    try {
        const item = await getItemById(req.params.id);
        const obj = {
            item,
            user: req.user
        }
        res.json(obj)
    } catch (error) {
        const message = errorParser(error);
        res.status(401).json(message)
    }
})


itemControler.post('/details/:id',hasUser(), async (req, res) => {
    try {
        const item = await getItemById(req.params.id);
        await addInCollection(item._id, req.user._id, req.body.price);
        const updatedItem = await getItemById(req.params.id);
        const obj = {
            updatedItem,
            user: req.user
        }
        res.json(obj)
    } catch (error) {
        const message = errorParser(error);
        res.status(401).json(message)
    }

})


itemControler.post('/edit/:id',hasUser(), async (req, res) => {

    const { title, category, imgUrl, price, description } = req.body;

    const edited = {
        title,
        category,
        imgUrl,
        price,
        description
    }

    try {
        await editItem(req.params.id, edited)
        res.status(204).end()
    } catch (error) {
        const message = errorParser(error);
        res.status(401).json(message)
    }
});


itemControler.get('/delete/:id',hasUser(), async (req, res) => {

    try {
        await deleteItem(req.params.id);

        res.status(204).end();
    } catch (error) {
        const message = errorParser(error);
        res.status(401).json(message)
    }
})

itemControler.get('/userAction/:id',hasUser(), async (req, res) => {
    try {
        await closeOffer(req.params.id)

        res.status(204).end()
    } catch (error) {
        const message = errorParser(error);
        res.status(401).json(message)
    }

});

itemControler.get('/closed', async (req, res) => {
    try {
        let items = await getAllItem()

        items = items.filter(x => x.description == 'isClosed' && x.owner.toString() == req.user._id);

        const obj = {
            items,
            user: req.user
        }

        res.json(obj)

    } catch (error) {
        const message = errorParser(error);
        res.status(401).json(message)
    }

});


module.exports = itemControler;