export default async function decorate(block) {
    let blockChildern = [...block.children];
    if(blockChildern){
        let imageWrappers =  blockChildern.map((blockChild)=> blockChild.firstElementChild);
        
        let caraouselSlideWrapper = document.createElement('div');
        caraouselSlideWrapper.classList.add('carousel-slides');
        caraouselSlideWrapper.tabIndex = '0';
        imageWrappers.forEach((slide, index) => {
            caraouselSlideWrapper.insertAdjacentHTML('beforeend',  getSlideTemplate(slide.firstElementChild, index+1, imageWrappers.length))
        })

        let caraouselNavWrapper = document.createElement('nav');
        caraouselNavWrapper.classList.add('carousel-nav');
        let list = document.createElement('ul');
        caraouselNavWrapper.appendChild(list);
        imageWrappers.forEach((slide, index) => {
            caraouselNavWrapper.firstElementChild.insertAdjacentHTML('beforeend',  getNavTemplate(index+1))
        })
        block.innerHTML = ''
        block.appendChild(caraouselSlideWrapper)
        block.appendChild(caraouselNavWrapper)
    
    } 
}

function getSlideTemplate(slide, index, length){
    let previousIndex = index === 1 ? length : index-1,
        nextIndex = index === length ? 0 : index+1;
        slide.querySelector('img').id = `item-${index}`
    return `<div class="slide">
            <a href="#item-${previousIndex}">Slide ${previousIndex}</a>
            ${slide.outerHTML}
            <a href="#item-${nextIndex}">Slide ${nextIndex}</a>
        </div>`
}

function getNavTemplate(index){
    return `<li><a href="#item-${index}" aria-label="Item ${index}">
        <svg viewBox="0 0 10 10" width="1em">
            <circle cx="5" cy="5" r="5" fill="#fff" />
        </svg>
        </a>
    </li>`
}
  
