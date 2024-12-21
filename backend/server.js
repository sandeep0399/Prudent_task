const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 

const app = express();
app.use(cors());
app.use(express.json()); 

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'supermarket_inventory',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
}); 


//  get items list Routes
app.get('/items',async(req,res)=>{   
    const data = await db.promise().query(`SELECT * FROM supermarket_inventory.items`)
    res.status(200).send({
        data:data[0]})
})

//delete items 

app.delete('/items/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'Delete from items where itemID =?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting item', err);
            return res.status(500).send('An error occurred while deleting the item.');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('item not found.');
        }

        res.send('item deleted successfully.');
    });
}); 



//get a  by item by id

app.get('/items/:id', (req, res) => {
    const { id } = req.params;

    const sql = `
       SELECT items.ItemID,
            items.Name,
            items.CategoryID,
            items.Price,
            items.Quantity ,
            categories.Category AS Category
        FROM items 
        LEFT JOIN categories ON items.CategoryID = categories.CategoryID
        WHERE items.ItemID = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching item details:', err);
            return res.status(500).send('An error occurred while fetching item details.');
        }

        if (result.length === 0) {
            return res.status(404).send('Item not found.');
        }

        res.json(result[0]); // Return the first (and only) result
    });
});


//add a book
app.post('/items', async (req, res) => {
    const { Name, Price, Quantity,Category  } = req.body;

    try {
        // Function to get or create an Category
        
        const getOrCreateCategory = async (CategoryName) => {
            const CategoryCheck = 'SELECT CategoryID FROM categories  WHERE Category= ?';
            const [dumi] = await db.promise().query(CategoryCheck, [CategoryName]);

            if (dumi.length > 0) {
                return dumi[0].CategoryID;
            } else {
                const insertCategory = 'INSERT INTO categories (Category) VALUES (?)';
                const [result] = await db.promise().query(insertCategory, [CategoryName]);
                return result.insertId; // Return the new AuthorID
            }
        };

    

        
        const CategoryId = await getOrCreateCategory(Category);


        // Insert the item into the books table
        const insertBook = `
            INSERT INTO items (Name, CategoryID, Price,Quantity)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.promise().query(insertBook, [Name, CategoryId, Price,Quantity ]);

        res.status(201).json({ message: 'item added successfully!', ItemID: result.insertId });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while adding the Item.' });
    }
});




app.put('/items/:id', async (req, res) => {
    const { id } = req.params;
  
    const { Name, Price, Quantity,Category  } = req.body;

    try {
        // Update category if new
        const [CategoryResult] = await db.promise().query('SELECT CategoryID FROM categories  WHERE Category=?', [Category]);
        let itemId = CategoryResult.length > 0 ? CategoryResult[0].CategoryID : null;

        if (!itemId) {
            const [itemInsert] = await db.promise().query('INSERT INTO categories (Category) VALUES (?)', [Category]);
            itemId = itemInsertInsert.insertId;
        }

      
        // Update item
        const updateQuery = `
            UPDATE items
            SET Name = ?, CategoryID = ?, Price = ?,Quantity  = ?
            WHERE ItemID = ?`;
        await db.promise().query(updateQuery, [Name, itemId, Price,Quantity,  id]);

        res.status(200).json({ message: 'item updated successfully!' });
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ error: 'Failed to update item.' });
    }
});









const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});