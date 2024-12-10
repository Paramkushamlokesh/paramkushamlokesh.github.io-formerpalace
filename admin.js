document.getElementById("addProductForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    // Collect form data
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    // Send data to the server
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, category, price, image })
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("responseMessage").innerHTML = `<p style="color: green;">${result.message} (ID: ${result.productId})</p>`;
        } else {
            document.getElementById("responseMessage").innerHTML = `<p style="color: red;">Error: ${result.error}</p>`;
        }
    } catch (error) {
        document.getElementById("responseMessage").innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }

    // Clear form fields
    document.getElementById("addProductForm").reset();
});
