module.exports = function(cp) {
  var me = {
    Holding: function(req,res)
    {
      var response = [];
      var obj = req.body.Holding;
      cp.query('UPDATE holding SET Name = ? WHERE id = ?;',
        [obj.Name, obj.id],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'updateHolding'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Не удалось выполнить запрос updateHolding', 'query': 'updateHolding'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });


    },

    MessageStatus: function(req,res)
    {
      var response = [];
      var obj = req.body.Message;
      cp.query('UPDATE messages SET IsOpened = 1 WHERE idmessages = ?;',
        [obj.idmessages],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'updateMessageStatus'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Не удалось выполнить запрос updateMessageStatus', 'query': 'updateMessageStatus'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });


    },
    TrancPayload: function(req,res)
    {
      var response = [];
      var obj = req.body.OrderTransaction;
      cp.query('UPDATE order_transaction SET payload = ? WHERE idorder_transaction = ?;',
        [obj.payload, obj.idorder_transaction],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'updateTrancPayload'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Не удалось выполнить запрос updateTrancPayload', 'query': 'updateTrancPayload'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });
    },
    Order: function(req,res)
    {
      var response = [];
      var obj = req.body.Order;
      cp.query('UPDATE orders SET users_idusers = ?, users_idusers1 = ?, users_idusers2 = ? WHERE idOperations = ? or parent_order = ?;',
        [obj.users_idusers, obj.users_idusers1 ,obj.users_idusers2, obj.idOperations, obj.idOperations],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'updateOrder'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Не удалось выполнить запрос updateOrder', 'query': 'updateOrder'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });


    },
    OrderComplete: function(req,res)
    {
      var response = [];
      var obj = req.body.Order;
      cp.query('UPDATE orders SET idUploadData = ? WHERE idOperations = ? or parent_order = ? ;',
        [obj.idUploadData,  obj.idOperations, obj.idOperations],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'updateOrderComplete'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Не удалось выполнить запрос updateTrancPayload', 'query': 'updateTrancPayload'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });


    },
  };
  return me;
}
