document.addEventListener('DOMContentLoaded', ()=>{
    //fetch ramens from the server
    fetch("http://localhost:3000/ramens")
    .then(r=>r.json())
    .then(data=>{
        //load the menu
        data.forEach((indivRamen)=>{
            loadMenuRamen(indivRamen)
        })
        //load ramenMenu function
        function loadMenuRamen(ramen){
            const menu = document.getElementById("ramen-menu")
            const ramenPic = document.createElement("img")
            ramenPic.src = ramen.image
            menu.appendChild(ramenPic)
            //adds functionality to click on pictures of the menu
            ramenPic.addEventListener('click', ()=>{
                loadDetails(ramen)
            })

        }
        //load details function
        let featuredRamen
        function loadDetails(ramen){
            const detailImage = document.querySelector('.detail-image')
            const name = document.querySelector('.name')
            const restaurant = document.querySelector('.restaurant')
            detailImage.src = ramen.image
            detailImage.alt = ramen.name
            name.textContent = ramen.name
            restaurant.textContent = ramen.restaurant
            const rating = document.querySelector('#rating-display')
            rating.textContent = ramen.rating
            const comment = document.querySelector('#comment-display')
            comment.textContent = ramen.comment
            featuredRamen = ramen
        }
        //initial page load
        loadDetails(data[0])

        //update ramen form
        const updateForm = document.getElementById('edit-ramen')
        updateForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            featuredRamen.comment = e.target["new-comment"].value
            featuredRamen.rating = e.target.rating.value
            loadDetails(featuredRamen)
        })

        //new ramen form
        const newForm = document.getElementById('new-ramen')
        newForm.addEventListener('submit', (e)=>{
            e.preventDefault()
            newRamen ={
                name : e.target.name.value,
                restaurant : e.target.restaurant.value,
                image : e.target.image.value,
                rating : e.target.rating.value,
                comment : e.target["new-comment"].value,
            }
            loadMenuRamen(newRamen)
        })
    })
//domcontentloaded closing brackets
})