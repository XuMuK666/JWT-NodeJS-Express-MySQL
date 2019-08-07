module.exports = function(cp) {
  var me = {
    Holding: function(req,res)
    {
      var response = [];
      var obj = req.body.Holding;
      cp.query('DELETE FROM holding WHERE id = ?;',
        [obj.id],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'deleteHolding'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса deleteHolding', 'query': 'deleteHolding'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });


    },
    Company: function(req,res)
    {
      var response = [];
      var obj = req.body.Company;
      cp.query('DELETE FROM company WHERE idCompany = ?;',
        [obj.idCompany],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'deleteCompany'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса deleteCompany', 'query': 'deleteCompany'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });


    },
    Holding_has_Company: function(req,res)
    {
      var response = [];
      var obj = req.body.Holding_has_Company;
      cp.query('DELETE FROM holding_has_company WHERE Holding_id = ? and Company_idCompany = ? ;',
        [obj.Holding_id, obj.Company_idCompany],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'deleteHolding_has_Company'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса deleteHolding_has_Company', 'query': 'deleteHolding_has_Company'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });


    },
    Orders: function(req,res)
    {
      var response = [];
      var obj = req.body.Order;
      cp.query('DELETE FROM orders WHERE idOperations = ? or parent_order = ? ;',
        [obj, obj],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'deleteOrders'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса deleteOrders', 'query': 'deleteOrders'});
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
