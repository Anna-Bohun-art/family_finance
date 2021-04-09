//Import Entry Model
Entry = require('./entryModel');

//For index
exports.index = function (req, res) {
    Entry.get(function (err, entry) {
        if (err)
            return res.json({
                status: "error",
                message: err
            });
        return res.json({
            status: "success",
            message: "Got Entry Successfully!",
            data: entry       
        });
    });
};

//For creating new entry
exports.add = function (req, res) {
    var entry = new Entry();
    entry.name = req.body.name? req.body.name: entry.name;
    entry.email = req.body.email;
    entry.phone = req.body.phone;
    entry.address = req.body.address;

    //Save and check error
    entry.save(function (err) {
        if (err)
            res.json(err);
    res.json({
            message: "New Entry Added!",
            data: entry
        });
    });
};

// View Entry
exports.view = function (req, res) {
    Entry.findById(req.params.entry_id, function (err, entry) {
        if (err)
            res.send(err);
        res.json({
            message: 'Entry Details',
            data: entry
        });
    });
};

// Update Entry
exports.update = function (req, res) {
    Entry.findById(req.params.entry_id, function (err, entry) {
        if (err)
            res.send(err);
        entry.name = req.body.name ? req.body.name : entry.name;
        entry.email = req.body.email;
        entry.phone = req.body.phone;
        entry.address = req.body.address;

        //save and check errors
        entry.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Entry Updated Successfully",
                data: entry
            });
        });
    });
};

// Delete Entry
exports.delete = function (req, res) {
    Entry.deleteOne({
        _id: req.params.entry_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Entry Deleted'
        })
    })
}