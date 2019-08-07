module.exports = function(cp) {
  var me = {
    Holding: function(req,res)
    {
      var response = [];
      var obj = req.body.Holding;
      cp.query('INSERT INTO holding (Name) VALUES (?);',
        [obj.Name],
        function (error, rows, fields) {
          if (!error) {
          if (rows.length != 0) {
            response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createHolding'});
          } else {
            response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса createHolding', 'query': 'createHolding'});
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
      cp.query('INSERT INTO company (Name, inn, kpp) VALUES (?,?,?);',
        [obj.Name, obj.inn, obj.kpp],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createCompany'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса createCompany', 'query': 'createCompany'});
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
      cp.query('INSERT INTO holding_has_company (Holding_id, Company_idCompany) VALUES (?,?);',
        [obj.Holding_id, obj.idCompany],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createHolding_has_Company'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса createHolding_has_Company', 'query': 'createHolding_has_Company'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            res.status(400).send(error);
          }
        });


    },

    Message: function(req,res)
    {
      var response = [];
      var obj = req.body.Message;
      cp.query('INSERT INTO messages ( Label, Message, messages.From, messages.To, Date) VALUES (?,?,?,?,(SELECT NOW()));',
        [obj.Label, obj.Message, obj.From, obj.To],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createMessage'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса createMessage', 'query': 'createMessage'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            console.log(error)
            res.status(400).send(error);
          }
        });
    },

    Chartofaccounts: function(req,res)
    {
      var response = [];
      var obj = req.body.ChartOfAccounts;
      cp.query('INSERT INTO chart_of_accounts (`acc_code`, `acc_name`, `acc_type`) VALUES (?,?,?);',
        [obj.acc_code, obj.acc_name, obj.acc_type],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createChartofaccounts'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса createChartofaccounts', 'query': 'createChartofaccounts'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            response.push({'result' : 'error', 'data' : [], 'msg' : 'Данный тип счета уже существует.', 'query': 'createChartofaccounts'});
            res.status(200).send(JSON.stringify(response));
          }
        });
    },

    Currency: function(req,res)
    {
      var response = [];
      var obj = req.body.Currency;
      cp.query('INSERT INTO currency (`idCurrency`,`Currency`) VALUES (?,?);',
        [obj.idCurrency, obj.Currency],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createCurrency'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса createCurrency', 'query': 'createCurrency'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            console.log(error)
            res.status(400).send(error);
          }
        });
    },
    Accounts: function(req,res)
    {
      var response = [];
      var obj = req.body.Accounts;
      cp.query('INSERT INTO `accounts` (`acc_code`, `Currency_idCurrency`, `holding_id`, `Company_idCompany`, `idAccounts`, `account_number`, `acc_type`) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [obj.acc_code, obj.Currency_idCurrency, obj.holding_id, obj.Company_idCompany, obj.idAccounts, obj.account_number, obj.acc_type],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createAccounts'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса createAccounts', 'query': 'createAccounts'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            console.log(error);
            res.status(400).send(error);
          }
        });
    },
    OrderTransaction: function(req,res)
    {
      var response = [];
      var obj = req.body.OrderTransaction;
      cp.query('INSERT INTO `unifin`.`order_transaction` ( `sign1`, `sign2`, `sign3`, `payload`, `orders_types_idorders_types`, `target_order`, `uploadFlag`) VALUES (?, ?, ?, ?, ?,?,?);',
        [obj.sign1, obj.sign2, obj.sign3, obj.payload, obj.orders_types_idorders_types, obj.target_order, obj.uploadFlag],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createOrderTransaction'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Ошибка при выполнении запроса createOrderTransaction', 'query': 'createOrderTransaction'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            console.log(error)
            res.status(400).send(error);
          }
        });
    },
    OrdersTypes: function(req,res)
    {
      var response = [];
      var obj = req.body.OrdersTypes;
      cp.query('INSERT INTO `unifin`.`orders_types` (`order_name`) VALUES (?);',
        [obj.order_name],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createOrdersTypes'});
            } else {
              response.push({'result' : 'error', 'data' : [],
                'msg' : 'Ошибка при выполнении запроса createOrdersTypes', 'query': 'createOrdersTypes'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
          } else {
            console.log(error)
            res.status(400).send(error);
          }
        });
    },
    Date: function(req,res)
    {
      var data = req.body.Date;
      cp.query('INSERT INTO date (Date) SELECT * FROM (SELECT ?) AS tmp WHERE NOT EXISTS (SELECT Date FROM date WHERE Date = ?) LIMIT 1;', [data, data],
        function (error, results, fields) {
          if (error) console.log(error);
          res.send(results);
        });
    },
    Order: function(req,res)
    {
      var response = [];
      var d = req.body.Order;
      cp.query('INSERT INTO `orders` (`SUMM`,`dr_account`, `cr_account`, `Target`, `Date_idDate`,`Currency_idCurrency`, `users_idusers`,`users_idusers1`,`users_idusers2`,`orders_types_idorders_types`, parent_order) VALUES (?,?,?,?,?,?,?,?,?,?,?);'
 , [d.SUMM, d.dr_account, d.cr_account, d.Target, d.Date_idDate, d.Currency_idCurrency, d.users_idusers, d.users_idusers1, d.users_idusers2, d.orders_types_idorders_types, d.parent_order],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'createOrder'});
            } else {
              response.push({'result' : 'error', 'data' : [],
                'msg' : 'Невозможно выполнить запрос CreateOrder',
                'query': 'CreateOrder'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            response.push({'result' : 'error', 'data' : [error],
              'msg' : 'Невозможно выполнить запрос CreateOrder',
              'query': 'CreateOrder'});
            res.status(200).send(response).end();
          }
        });
    },
    Bank: function(req,res)
    {
      var data = req.body.Bank;
      cp.query('INSERT INTO `banks` (`bank_name`) VALUES (?);', [data],
        function (error, results, fields) {
          if (error) console.log(error);
          res.send(results);
        });
    },
    BankOffices: function(req,res)
    {
      var data = req.body.idBank;
      var offices = req.body.offices.replace(/\s/g, '').toLowerCase().split(';');
      var q = 'INSERT INTO `bic` (`idBic`, `banks_idbank`) VALUES';
      for (var index in offices) {
        if(offices[index].length>0) {
          q = q + ' (' + offices[index] + ', ' + data + '),'
        }
      }
      q = q.slice(0,q.lastIndexOf(',')) + ';';
      cp.query(q, [],
        function (error, results, fields) {
          if (error) console.log(error);
          res.send(results);
        });
    },
  };
  return me;
}
