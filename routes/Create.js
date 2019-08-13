module.exports = function(cp) {
  var me = {
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
    
  };
  return me;
}
