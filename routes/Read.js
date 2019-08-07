module.exports = function(cp) {
  var me = {
    Holding: function(req,res)
    {
      var response = [];
      var obj = req.body.Holding;
      cp.query('SELECT * FROM holding WHERE id = ?;',
        [obj.id],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectHolding'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectHolding', 'query': 'selectHolding'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    AllHoldings: function(req,res)
    {
      var response = [];
      cp.query('SELECT * FROM holding ;',
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectAllHoldings'});
              console.log(response)
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectAllHoldings', 'query': 'selectAllHoldings'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    AllCompanies: function(req,res)
    {
      var response = [];
      cp.query('SELECT * FROM company ;',
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectAllCompanies'});
              console.log(response)
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectAllCompanies', 'query': 'selectAllCompanies'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    Company: function(req,res)
    {
      var response = [];
      var obj = req.body.Company;
      cp.query('SELECT * FROM company WHERE idCompany = ? ;',
        [obj.idCompany],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectCompany'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectCompany', 'query': 'selectCompany'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    Companies_by_Holding: function(req,res)
    {
      var response = [];
      var obj = req.body.Holding;
      console.log(obj);
      cp.query('SELECT * FROM company INNER JOIN(SELECT Company_idCompany as idCompany FROM holding_has_company WHERE Holding_id = ?) t1 USING(idCompany)  ;',
        [obj.id],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectCompanies_by_Holding'});
            } else {
              console.log(error);
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectCompanies_by_Holding', 'query': 'selectCompanies_by_Holding'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    CountOpenedMessagesbyUser: function(req,res)
    {
      var response = [];
      var obj = req.body.idUser;
      cp.query('SELECT COUNT(*) as Ammount from messages  WHERE IsOpened = 0 and messages.To = ?;',
        [obj],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectCountOpenedMessagesbyUser'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectCountOpenedMessagesbyUser', 'query': 'selectCountOpenedMessagesbyUser'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            console.log(error)
            res.status(400).send(error).end();
          }
        });
    },
    CountClosedMessagesbyUser: function(req,res)
    {
      var response = [];
      var obj = req.body.idUser;
      cp.query('SELECT COUNT(*) as Ammount from messages  WHERE IsOpened = 1 and messages.To = ?;',
        [obj],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectCountClosedMessagesbyUser'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectCountClosedMessagesbyUser', 'query': 'selectCountClosedMessagesbyUser'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    IncomingMessagesbyUser: function(req,res)
    {
      var response = [];
      var obj = req.body.MessagesbyUser;
      cp.query('SELECT * from messages  WHERE messages.To = ? LIMIT ?;',
        [obj.idUser, obj.Limit],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectIncomingMessagesbyUser'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectIncomingMessagesbyUser', 'query': 'selectIncomingMessagesbyUser'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    OutcomingMessagesbyUser: function(req,res)
    {
      var response = [];
      var obj = req.body.MessagesbyUser;
      cp.query('SELECT * from messages  WHERE messages.From = ? LIMIT ?;',
        [obj.idUser, obj.Limit],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectOutcomingMessagesbyUser'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectOutcomingMessagesbyUser', 'query': 'selectOutcomingMessagesbyUser'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    idUser: function(req,res)
    {
      var response = [];
      var obj = req.body.User;
      cp.query('SELECT idusers from users  WHERE username =?;',
        [obj.username],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectidUser'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectidUser', 'query': 'selectidUser'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    ChartOfAccounts: function(req,res)
    {
      var response = [];
      cp.query('SELECT * from chart_of_accounts;',
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectChartOfAccounts'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectChartOfAccounts', 'query': 'selectChartOfAccounts'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
            // console.log(res)
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    Currency: function(req,res)
    {
      var response = [];
      cp.query('SELECT * from currency;',
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectCurrency'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectCurrency', 'query': 'selectCurrency'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    CurrencybyID: function(req,res)
    {
      var response = [];
      cp.query('SELECT * from currency WHERE idCurrency = ?;',
        [req.body.Currency.idCurrency],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectCurrencybyID'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectCurrencybyID', 'query': 'selectCurrencybyID'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },

    AccountsByHolding: function(req,res)
    {
      var response = [];
      var obj = req.body.Holding;
      cp.query('SELECT * from accounts INNER JOIN(SELECT idCompany as Company_idCompany, Name from company) t1 USING(Company_idCompany) INNER JOIN(SELECT idCurrency as Currency_idCurrency, Currency from currency) t2 USING(Currency_idCurrency) INNER JOIN(chart_of_accounts) USING(acc_code, acc_type) where holding_id = ?',
        [obj.id],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectAccountsByHolding'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectAccountsByHolding', 'query': 'selectAccountsByHolding'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    CountIdAccountsByHoldingandCompany: function(req,res)
    {
      var obj = req.body.Holding_has_Company;
      var response = [];
      cp.query('SELECT Count(*) as Count from accounts where holding_id=?;',
        [obj.Holding_id],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectCountIdAccountsByHoldingandCompany'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectCountIdAccountsByHoldingandCompany', 'query': 'selectCountIdAccountsByHoldingandCompany'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    AllUsers: function(req,res)
    {
      var response = [];
      cp.query('SELECT username, role, Name FROM users;',
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectAllUsers'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectAllUsers', 'query': 'selectAllUsers'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    OrderTrancsactionList: function(req,res)
    {
      var response = [];
      cp.query('SELECT * FROM order_transaction INNER JOIN orders_types ON orders_types_idorders_types = orders_types.idorders_types LEFT JOIN (SELECT idorders_types, order_name as trgname FROM orders_types) t1 ON (target_order = t1.idorders_types);',
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectOrderTrancsactionList'});
            } else {
              console.log(error)
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectOrderTrancsactionList',
                'query': 'selectOrderTrancsactionList'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    OrderTypes: function(req,res)
    {
      var response = [];
      cp.query('SELECT * FROM orders_types;',
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectOrderTypes'});
            } else {
              response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectOrderTypes',
                'query': 'selectOrderTypes'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },

    TrancsationInfo: function(req,res)
    {
      var Parser = function (rows) {
        for (j =0; j<rows.length; j++) {
          var str = rows[j]['payload'];
          var result = {};
          var array = str.split(';');
          for (part = 0; part < array.length; part++) {
            var a = array[part].split('=');
            try {
              var i = parseInt(a[1]);
              if (i || i===0) {
                result[a[0].replace(/\s/g, '').toLowerCase()] = i;
              } else {
                result[a[0].replace(/\s/g, '').toLowerCase()] = a[1].replace(/\s/g, '').toLowerCase();
              }
            } catch (err) {
            }
          }
          rows[j]['payload'] = result;
        }
        return rows
      }
      var response = [];
      var obj = req.body.OrderTransaction;
      var extra = req.body.Extra;
      q = 'SELECT * FROM order_transaction WHERE sign1=? and sign2=? and sign3=? and orders_types_idorders_types =?'
      if (extra == 1) {
        q = 'SELECT * FROM order_transaction WHERE sign1=0 and sign2=0 and sign3=0 and uploadFlag=1;';
        cp.query(q,
          [],
          function (error, rows, fields) {
            if (!error) {
              if (rows.length != 0) {

                response.push({'result' : 'success', 'data' : Parser(rows) ,'msg': '200 OK', 'query': 'selectTrancsationInfo'});
              } else {
                response.push({'result' : 'error', 'data' : [], 'msg' : 'Невозможно получить результаты запроса selectTrancsationInfo',
                  'query': 'selectTrancsationInfo'});
              }

              res.setHeader('Content-Type', 'application/json');
              res.status(200).send(JSON.stringify(response)).end();
            } else {
              res.status(400).send(error).end();
            }
          });
      } else {
        cp.query(q,
          [obj.sign1, obj.sign2, obj.sign3, obj.orders_types_idorders_types],
          function (error, rows, fields) {
            if (!error) {
              if (rows.length != 0) {

                response.push({
                  'result': 'success',
                  'data': Parser(rows),
                  'msg': '200 OK',
                  'query': 'selectTrancsationInfo'
                });
              } else {
                response.push({
                  'result': 'error', 'data': [], 'msg': 'Невозможно получить результаты запроса selectTrancsationInfo',
                  'query': 'selectTrancsationInfo'
                });
              }

              res.setHeader('Content-Type', 'application/json');
              res.status(200).send(JSON.stringify(response)).end();
            } else {
              res.status(400).send(error).end();
            }
          });
      }
    },
    AccountsbyCompanywithSearch: function(req,res)
    {
      var response = [];
      var hold = req.body.holding.id;
      var comp = req.body.company.idCompany;
      var like = req.body.like;
      cp.query('SELECT * from accounts where holding_id = ? and Company_idCompany = ? and account_number like ?',
        [hold, comp, like],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectAccountsbyCompanywithSearch'});
            } else {
              response.push({'result' : 'error', 'data' : [],
                'msg' : 'Невозможно получить результаты запроса selectAccountsbyCompanywithSearch',
                'query': 'selectAccountsbyCompanywithSearch'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    AccountSearch: function(req,res)
    {
      var response = [];
      var like = req.body.like;
      cp.query('SELECT * from accounts where account_number like ? LIMIT 1',
        [like],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectAccountSearch'});
            } else {
              response.push({'result' : 'error', 'data' : [],
                'msg' : 'Невозможно получить результаты запроса selectAccountSearch',
                'query': 'selectAccountSearch'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    Today: function(req,res)
    {
      var response = [];
      cp.query('SELECT DATE_FORMAT(now(),\'%Y-%c-%d\') as Date, DATE_FORMAT(SUBDATE(now(), INTERVAL ? DAY),\'%Y-%c-%d\') as MinDate;',
        [req.body.DS],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectToday'});
            } else {
              response.push({'result' : 'error', 'data' : [],
                'msg' : 'Невозможно получить результаты запроса selectToday',
                'query': 'selectToday'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    idDate: function(req,res)
    {
      var response = [];
      cp.query('SELECT idDate FROM date WHERE Date = ?;',
        [req.body.Date],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectidDate'});
            } else {
              response.push({'result' : 'error', 'data' : [],
                'msg' : 'Невозможно получить результаты запроса selectidDate',
                'query': 'selectidDate'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    OrdersList: function(req,res)
  {
    var response = [];
    var q = 'SELECT idOperations, orders_types_idorders_types, users_idusers, users_idusers1, users_idusers2, t13.SUMM, t13.dr_account, t13.cr_account, t13.Target, t13.parent_order, DATE_FORMAT(t13.Date,\'%Y-%m-%d\') as Date, t13.Currency, t13.order_name, t13.drh, t13.drc, t13.crh, t13.crc, t13.USR0, t13.USR1, t13.USR2, idUploadData, uplSumm, uplSender, uplReciever, uplAccountSender, uplAccountReciever, uplDate, uplTarget FROM (SELECT * FROM orders INNER JOIN (SELECT * FROM date)t1 ON(orders.Date_idDate=t1.idDate) INNER JOIN (SELECT * from currency) t2 ON (orders.Currency_idCurrency=t2.idCurrency) INNER JOIN (SELECT * from orders_types) t3 ON (orders.orders_types_idorders_types = t3.idorders_types) INNER JOIN (SELECT holding_id as drhid, Company_idCompany as dric, account_number as dan from accounts) t4 ON(orders.dr_account = t4.dan) INNER JOIN (SELECT holding_id as crhid, Company_idCompany as cric, account_number as can from accounts)  t5 ON(orders.cr_account = t5.can) INNER JOIN(SELECT id as did, Name as drh FROM holding) t6 ON (t4.drhid=t6.did) INNER JOIN(SELECT idCompany as dic, Name as drc from company) t7 ON (t4.dric = t7.dic) INNER JOIN(SELECT id as cid, Name as crh FROM holding) t8 ON (t5.crhid=t8.cid) INNER JOIN(SELECT idCompany as cic, Name as crc from company) t9 ON (t5.cric = t9.cic) left JOIN(SELECT idusers as iu10, username as USR0 from users) t10 ON (orders.users_idusers = t10.iu10) left JOIN(SELECT idusers as iu11, username as USR1 from users) t11 ON (orders.users_idusers1 = t11.iu11) left JOIN(SELECT idusers as iu12, username as USR2 from users) t12 ON (orders.users_idusers2 = t12.iu12) LEFT JOIN(SELECT idUploadData as ud, Summ as uplSumm, Sender as uplSender, Reciever as uplReciever, AccountSender as uplAccountSender, AccountReciever as uplAccountReciever, Date as uplDate, Target as uplTarget FROM uploaddata) t14 ON (orders.idUploadData = t14.ud) ' + req.body.order_types + req.body.sign + ' ) t13 ' + req.body.filter+ ' ORDER BY idOperations DESC LIMIT 20 offset ?;'
    cp.query(q,
      [ req.body.offset],
      function (error, rows, fields) {
        if (!error) {
          if (rows.length != 0) {
            response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectOrdersList'});
          } else {
            response.push({'result' : 'error', 'data' : [],
              'msg' : 'Невозможно получить результаты запроса selectOrdersList',
              'query': 'selectOrdersList'});
          }

          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(response)).end();
        } else {
          res.status(400).send(error).end();
        }
      });
  }, UnusedOperations: function(req,res)
    {
      var response = [];
      var q = 'SELECT * FROM uploaddata u left JOIN (SELECT idUploadData iud from orders) t1 ON t1.iud = u.idUploadData WHERE t1.iud is NULL ' + req.body.filter;
      cp.query(q,
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectUnusedOperations'});
            } else {
              response.push({'result' : 'error', 'data' : [],
                'msg' : 'Невозможно получить результаты запроса selectUnusedOperations',
                'query': 'selectUnusedOperations'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
    Banks: function(req,res)
  {
    var response = [];
    var q = 'SELECT * FROM banks';
    cp.query(q,
      [],
      function (error, rows, fields) {
        if (!error) {
          if (rows.length != 0) {
            response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectBanks'});
          } else {
            response.push({'result' : 'error', 'data' : [],
              'msg' : 'Невозможно получить результаты запроса selectBanks',
              'query': 'selectBanks'});
          }

          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(response)).end();
        } else {
          res.status(400).send(error).end();
        }
      });
  },
    AccTypes: function(req,res)
    {
      var response = [];
      var q = 'SELECT * FROM acc_type';
      cp.query(q,
        [],
        function (error, rows, fields) {
          if (!error) {
            if (rows.length != 0) {
              response.push({'result' : 'success', 'data' : rows, 'msg': '200 OK', 'query': 'selectacc_type'});
            } else {
              response.push({'result' : 'error', 'data' : [],
                'msg' : 'Невозможно получить результаты запроса selectacc_type',
                'query': 'selectacc_type'});
            }

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response)).end();
          } else {
            res.status(400).send(error).end();
          }
        });
    },
  };
  return me;
}
