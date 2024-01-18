const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '0f36add0c9msh34562c12e8036c9p19e099jsn7c17ca2b3c72',
    'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
  }
};

const fetchAndDisplayBooks = async () => {
  const url = 'https://hapi-books.p.rapidapi.com/nominees/romance/2020';

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    data.forEach((book) => {
      let card = document.createElement("div");
      card.className = "card card-clickable col-lg-3 col-md-4 col-sm-6 my-3 mx-auto";
      card.style.width = "13rem";
      card.setAttribute("data-book-id", book.book_id);

      let cardImage = document.createElement("img");
      cardImage.className = "card-img-top img-fluid";
      cardImage.setAttribute("src", book.cover);
      cardImage.style.height = "auto";
      cardImage.style.width = "100%";

      let cardBody = document.createElement("div");
      cardBody.className = "card-body";

      let cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = book.name;

      let cardText = document.createElement("p");
      cardText.className = "card-text fs-6";
      cardText.textContent = book.author;

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardImage);
      card.appendChild(cardBody);
      document.getElementById("appendData").appendChild(card);
    });
  }
  catch (error) {
    console.error(error);
  }
};

async function getBookDetail(bookId) {
  const url = `https://api.example.com/books/${bookId}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Book Details:", data); // Debugging: Log the book details
    return data;
  } catch (error) {
    console.error(error);
  }
}

function openBookModal(book) {
  // Debugging: Check if the book object is as expected
  console.log("Opening modal with book data:", book);

  if (!book) {
    console.error("No book data to display in modal.");
    return;
  }

  const modalTitle = document.getElementById("bookModalLabel");
  const modalCover = document.getElementById("modalCover");
  const modalPublishDate = document.getElementById("modalPublishDate");
  const modalPageCount = document.getElementById("modalPageCount");
  const modalOverview = document.getElementById("modalOverview");
  const modalRating = document.getElementById("modalRating");

  modalTitle.textContent = book.name || 'No Title';
  modalCover.src = book.cover || 'default_image_path.jpg'; // Add a default image path
  modalPublishDate.textContent = book.publish_date || 'Unknown';
  modalPageCount.textContent = `${book.page_count || 0} pages`;
  modalOverview.textContent = book.overview || 'No overview available.';
  modalRating.textContent = book.rating || 'No rating';

  const bookModal = new bootstrap.Modal(document.getElementById("bookModal"));
  bookModal.show();
}



async function handleCardClick(event) {
  const clickedCard = event.target.closest(".card-clickable");
  if (clickedCard) {
    const bookID = clickedCard.dataset.bookId;
    try {
      const bookDetails = await getBookDetail(bookID);
      openBookModal(bookDetails);
    } catch (error) {
      console.error(error);
    }
  }
}

document.getElementById("appendData").addEventListener("click", handleCardClick);

fetchAndDisplayBooks(); // Call the function to fetch data
