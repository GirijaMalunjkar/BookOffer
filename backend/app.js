
const app = express();

dotenv.config();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Testing server
app.get('/', (req, res) => {
    res.send('Zingalbell');
});

app.use('/api', route);

const port = process.env.PORT || 5000;

ConnectDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
