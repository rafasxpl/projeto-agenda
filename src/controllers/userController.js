exports.userController = (req, res) => {
    res.json({
        name: req.params.name,
        id: req.params.idUser,
    })

    console.log(req.params);
}
