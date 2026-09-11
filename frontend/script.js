// Wait for the HTML page to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // 1. Mobile Menu Toggle
  // ==========================================
  var menuToggleBtn = document.getElementById('menuToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (menuToggleBtn && primaryNav) {
    menuToggleBtn.addEventListener('click', function() {
      primaryNav.classList.toggle('open');
      
      var isOpen = primaryNav.classList.contains('open');
      if (isOpen) {
        menuToggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        menuToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 2. Filter Coffee Cards
  // ==========================================
  var filterButtons = document.querySelectorAll('.chip');
  var coffeeCards = document.querySelectorAll('.card');

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function(event) {
      for (var j = 0; j < filterButtons.length; j++) {
        filterButtons[j].classList.remove('active');
      }
      
      var clickedButton = event.currentTarget;
      clickedButton.classList.add('active');
      var selectedFilter = clickedButton.getAttribute('data-filter');

      for (var k = 0; k < coffeeCards.length; k++) {
        var currentCard = coffeeCards[k];
        var cardCategory = currentCard.getAttribute('data-category');

        if (selectedFilter === 'all' || cardCategory === selectedFilter) {
          currentCard.style.display = 'flex';
        } else {
          currentCard.style.display = 'none';
        }
      }
    });
  }

  // ==========================================
  // 3. Status Button Update
  // ==========================================
  var checkButton = document.getElementById('checkBtn');
  var statusDisplay = document.getElementById('liveStatus');

  if (checkButton && statusDisplay) {
    checkButton.addEventListener('click', function() {
      var currentTime = new Date();
      var timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      statusDisplay.textContent = "Barista Station Active (" + timeString + ")";
      statusDisplay.style.color = "#a5856f";
    });
  }

  // ==========================================
  // 4. API Integration (Project 2 Backend Link)
  // ==========================================
  var orderBtn = document.querySelector('.nav-cta');
  
  if (orderBtn) {
    orderBtn.addEventListener('click', function(event) {
      event.preventDefault(); 

      var newOrderData = {
        customerName: "DecodeLabs Intern",
        itemId: 1 
      };

      fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrderData)
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.error) {
          alert("Server Error: " + data.error);
        } else {
          alert(data.message + "\nYour total is $" + data.order.total);
        }
      })
      .catch(function(error) {
        alert("Could not connect to the backend API. Is the server running?");
        console.error(error);
      });
    });
  }

});