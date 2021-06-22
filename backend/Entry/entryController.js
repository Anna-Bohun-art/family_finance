const { Model } = require('mongoose');

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
    entry.date = req.body.date;
    entry.store = req.body.store;
    entry.type = req.body.type;
    entry.value = req.body.value;

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

// View Month Entry
exports.monthView = function (req, res) {
    const endDate = new Date();
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), "01");
    
    console.log('startDate: ', startDate);
    console.log('endDate: ', endDate);

    Entry.aggregate(
        [{
            $match: {
                "created_at": {
                    $gte: startDate, 
                    $lte: endDate
                }
            }
        }, 
        {
            $group: {
                _id: "$type", 
                value: { 
                    $sum: "$value"
                },
            }
        }], function(err, result) {
            console.log('result: ', result);
            const respType = [];
            const respValues = [];
            result.forEach(entry => {
                respType.push(entry._id);
                respValues.push(entry.value);
            });

            return res.json({
                status: 200,
                data: {
                    types: respType,
                    values: respValues,
                }       
            });
        }
    );
};
        /*let tmp = [];
        entries.forEach(entry => {
            prevValue = tmp[entry.type] !== undefined ? tmp[entry.type].value : 0;
            tmp[entry.type] = {
                type: entry.type,
                value: prevValue + parseInt(entry.value)
            };
        });
        const responseType = [];
        const responseValues = [];
        console.log('tmp: ', tmp);
        console.log('tmp.length: ', tmp.length);
        for (let index = 0; index < tmp.length; index++) {
            const entry = array[index];
            console.log('entry: ', entry);
            responseType.push(entry.type);
            responseValues.push(entry.value);
        }
        console.log('responseType: ', responseType);
        console.log('responseValues: ', responseValues);
        const response = { types: responseType, values: responseValues };
        console.log('response: ', response);
        return res.json({
            status: 200,
            data: response       
        });*/
        

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
