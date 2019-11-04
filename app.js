const express =require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

app.get('/',function(req,res){
    res.send('/api/names');
    res.end();
});
const names=[
    {id:1, name:"siddardha"},
    {id:2, name:"sid"},
    {id:3, name:"Kolanupaka"}

]

app.get('/api/names',function(req,res){
    res.send(names);
});
app.get('/api/names/:id',function(req,res){
    const cname=names.find(name=>name.id==parseInt(req.params.id));
    if(!cname){
        res.status(404).send("Name not Found");
    }
    res.send(cname);
});
app.post('/api/names/',function(req,res){
    const schema={
        name: Joi.string().min(3).required()
    }
    const result=Joi.validate(req.body, schema);
    console.log(result);
    if(result.error){
       return res.status(400).send(result.error.details[0].message);
    }
    const name = {
        id: names.length+1,
        name: req.body.name,
    };
    names.push(name);
    res.send(name)
});
app.put('/api/names/:id', function(req,res){
    const cname = names.find(name => name.id == parseInt(req.params.id));
    if(!cname) {
       return res.send(400).send("Name not found");
    }
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    cname.name=req.body.name;
    res.send(cname);
});
app.delete('/api/names/:id', function(req,res){
    const cname = names.find(name => name.id === parseInt(req.params.id));
    if(!cname) {
        return res.send(400).send("Name not found");
    }
    const index=names.indexOf(cname);
    names.splice(index, 1);
    res.send(cname)
})
const PORT = process.env.PORT||5000;
app.listen(PORT, function(){
    console.log(`server listening on port ${PORT}`);
})