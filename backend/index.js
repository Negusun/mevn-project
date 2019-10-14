import express from './node_modules/express'
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

//routes
import router from './routes/index';

//connect string
mongoose.Promise = global.Promise;
const db_url = 'mongodb://localhost:27017/dbsistema';
mongoose.connect(db_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(mongoose => console.log('DB Connected...'))
.catch(err => console.log(err));

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));

app.use('/api', router);

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), ()=>{
    console.log('Server running on port '+app.get('port'));
});