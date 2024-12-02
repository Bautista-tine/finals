// Reference elements for Add Product Modal
const addProductModal = document.getElementById('addProductModal');
const addProductForm = document.getElementById('addProductForm');
const tableBody = document.querySelector('table tbody');

// Open and close modal
function openAddProductModal() {
  addProductModal.style.display = 'block';
}

function closeAddProductModal() {
  addProductModal.style.display = 'none';
  addProductForm.reset(); // Reset the form fields
}

// Initialize product ID counter
let productIdCounter = 1; // You can also use a timestamp or UUID for unique IDs

// Handle Add Product form submission
addProductForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form data
  const productName = document.getElementById('productName').value;
  const quantity = document.getElementById('quantity').value;

  // Generate unique product ID
  const productId = `P-${productIdCounter.toString().padStart(4, '0')}`;
  productIdCounter++; // Increment counter for the next product

  // Get the current date in YYYY-MM-DD format
const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

// Create new table row
const newRow = document.createElement('tr');
newRow.innerHTML = `
  <td>${productId}</td>
  <td>${formattedDate}</td>
  <td>${productName}</td>
  <td>${quantity}</td>
  <td><span class="delete-btn" onclick="showModal(this)">🗑️</span></td>
`;

// Append the new row to the table
tableBody.appendChild(newRow);

  // Close the modal and reset the form
  closeAddProductModal();
});


let rowToDelete; // Only one declaration of this variable

// Delete row functionality
function showModal(element) {
  rowToDelete = element.closest('tr'); // Store the row to delete
  document.getElementById('deleteModal').style.display = 'flex';
}

function hideModal() {
  document.getElementById('deleteModal').style.display = 'none';
}

function confirmDelete() {
  if (rowToDelete) {
    rowToDelete.remove(); // Delete the row from the table
    rowToDelete = null; // Clear the reference
  }
  hideModal();
}


// Open Add Product Modal
function openAddProductModal() {
  document.getElementById("addProductModal").style.display = "block";
}

// Close Add Product Modal
function closeAddProductModal() {
  document.getElementById("addProductModal").style.display = "none";
}

// Update dashboard quantities
function updateDashboard(flavor, quantity) {
  const flavorId = `${flavor.toLowerCase()}-total`;
  const flavorElement = document.getElementById(flavorId);

  if (flavorElement) {
      const currentQuantity = parseInt(flavorElement.textContent) || 0;
      flavorElement.textContent = currentQuantity + quantity;
  }
}

// Handle form submission
document.getElementById("addProductForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form refresh

  const productName = document.getElementById("productName").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value);

  if (productName && quantity > 0) {
      // Update the dashboard
      updateDashboard(productName, quantity);

      // Close modal
      closeAddProductModal();

      // Optionally add the product to the inventory table (implementation omitted)
      console.log(`Product added: ${productName}, Quantity: ${quantity}`);
  } else {
      alert("Please provide a valid product name and quantity.");
  }
});

/* filter date */
function filterByDate() {
  const selectedDate = document.getElementById('date').value; // Get the selected date in YYYY-MM-DD format
  const rows = document.querySelectorAll('table tbody tr'); // Select all rows in the table body

  rows.forEach(row => {
    const rowDateCell = row.cells[1]; // Ensure the second column exists
    if (!rowDateCell) return; // Skip rows without a second column

    const rowDate = rowDateCell.textContent.trim(); // Extract and trim the date text
    const formattedRowDate = new Date(rowDate).toISOString().split('T')[0]; // Format the row date to YYYY-MM-DD

    // Show or hide the row based on whether the dates match
    if (selectedDate && formattedRowDate === selectedDate) {
      row.style.display = ''; // Show the row
    } else {
      row.style.display = 'none'; // Hide the row
    }
  });
}

// Attach event listener to the date input
document.getElementById('date').addEventListener('input', filterByDate);
