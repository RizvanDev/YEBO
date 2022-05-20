const myObject = {
   modal: ({ openModal, modal, modalContainer, modalClose }) => {

      const modalMethods = {
         0: opening => {
            modal.classList.add('--opened')
            modalContainer.classList.add('--opened')
            document.body.classList.add('--lock')
         },
         1: closing => {
            modal.classList.remove('--opened')
            modalContainer.classList.remove('--opened')
            if (!document.querySelector('.header').classList.contains('--active')) document.body.classList.remove('--lock')
         },
         2: propagation => event.stopPropagation(),
      }

      return [openModal, modal, modalContainer, modalClose].forEach((element, index) => {
         element.addEventListener('click', modalMethods[index] || modalMethods[1])
      })
   },
   slider: ({ container, slides, slide, prevBtn, nextBtn, dots, dotsContainer, autoTime, auto, transitionTime = '0', transitionType = 'linear', transition, infinity }) => {

      let step = 0

      // infinity
      if (infinity) {

         step = 1

         container.style.transform = `translate3d(-${step * slide.offsetWidth}px,0,0)`

         const firstSlideClone = slides[0].cloneNode(true)
         const lastSlideClone = slides[slides.length - 1].cloneNode(true)
         firstSlideClone.classList.add('first-clone')
         lastSlideClone.classList.add('last-clone')
         container.appendChild(firstSlideClone)
         container.insertBefore(lastSlideClone, container.firstChild)

         const firstDotClone = dots[1].cloneNode(false)
         const lastDotClone = dots[dots.length - 1].cloneNode(false)
         firstDotClone.classList.add('--invisible')
         lastDotClone.classList.add('--invisible')
         dotsContainer.appendChild(lastDotClone)
         dotsContainer.insertBefore(firstDotClone, dotsContainer.firstChild)
      }

      // scroll function
      const scrolling = () => container.style.transform = `translate3d(-${step * slide.offsetWidth}px,0,0)`

      // transition   
      const transitionScroll = () => transition ? container.style.transition = `all ${transitionTime}s ${transitionType}` : false

      const infinityScroll = () => {

         const jumping = () => {
            if (slides[step].classList.contains('first-clone')) step = 1
            if (slides[step].classList.contains('last-clone')) step = slides.length - 2
            container.style.transition = 'none'
            scrolling()
         }

         if (infinity) container.addEventListener('transitionend', jumping)

         return false
      }

      // buttons
      if (prevBtn) prevBtn.addEventListener('click', () => {
         step--
         if (step < 0) step = slides.length - 1
         infinityScroll()
         transitionScroll()
         scrolling()
         activeDot()
         clearInterval(intervalScroll)
      })

      if (nextBtn) nextBtn.addEventListener('click', () => {
         step++
         if (step >= slides.length) step = 0
         infinityScroll()
         transitionScroll()
         scrolling()
         activeDot()
         clearInterval(intervalScroll)
      })

      // auto scroll
      let intervalScroll

      const scroll = () => {
         step++
         if (step >= slides.length) step = 0
         infinityScroll()
         transitionScroll()
         scrolling()
         activeDot()
      }

      if (auto) intervalScroll = setInterval(scroll, autoTime)



      // dots
      const removeActiveDots = () => Array.prototype.forEach.call(dots, ((_, index) => dots[index].classList.remove('--active')))

      const activeDot = () => {

         removeActiveDots()

         if (infinity) {
            if (step === slides.length - 1) dots[1].classList.add('--active')
            if (step === 0) dots[dots.length - 2].classList.add('--active')
         }

         return dots[step].classList.add('--active')
      }

      const pushDot = () => {
         Array.prototype.forEach.call(dots, ((_, index) => {
            dots[index].addEventListener('click', () => {
               removeActiveDots()
               dots[index].classList.add('--active')
               step = index
               infinityScroll()
               scrolling()
               transitionScroll()
               clearInterval(intervalScroll)
            })
         }))
      }
      pushDot()

      // swipe, drag
      const swipeFn = () => {

         let startX, moveX, endX

         const swipeMethods = {
            ['touchstart']: event => startX = event.touches[0].clientX,
            ['touchmove']: event => moveX = event.touches[0].clientX,
            ['touchend']: () => {

               endX = startX - moveX

               if (endX > 60) {
                  step++
                  if (step >= slides.length) step = 0
                  infinityScroll()
                  scrolling()
                  activeDot()
                  transitionScroll()
                  clearInterval(intervalScroll)
               }

               if (endX < -60) {
                  step--
                  if (step < 0) step = slides.length - 1
                  infinityScroll()
                  scrolling()
                  activeDot()
                  transitionScroll()
                  clearInterval(intervalScroll)
               }

               return startX = moveX = undefined
            }
         }

         return ['touchstart', 'touchmove', 'touchend'].forEach(eType => container.addEventListener(eType, swipeMethods[eType], { passive: true }))
      }
      swipeFn()
   }
}

export const { modal: myModal, slider: mySlider } = myObject