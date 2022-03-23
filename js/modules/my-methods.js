
const myObject = {

   modal: (obj) => {

      const { openModal, modal, modalContainer, modalClose } = obj

      const openedModal = () => {
         modal.classList.add('--opened')
         modalContainer.classList.add('--opened')
         document.body.classList.add('--lock')
      }

      const closedModal = () => {
         modal.classList.remove('--opened')
         modalContainer.classList.remove('--opened')
         if (!document.querySelector('.header').classList.contains('--active')) document.body.classList.remove('--lock')
      }

      openModal.addEventListener('click', openedModal)
      modalClose.addEventListener('click', closedModal)
      modal.addEventListener('click', closedModal)
      modalContainer.addEventListener('click', event => event.stopPropagation())
   },
   slider: (obj) => {

      let { container, slides, slide, prevBtn, nextBtn, dots, dotsContainer, autoTime, auto, transitionTime = '0', transitionType = 'linear', transition, infinity } = obj

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
      const removeActiveDots = () => {
         for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('--active')
         }
      }

      const activeDot = () => {

         removeActiveDots()

         if (infinity) {
            if (step === slides.length - 1) dots[1].classList.add('--active')
            if (step === 0) dots[dots.length - 2].classList.add('--active')
         }

         return dots[step].classList.add('--active')
      }

      const pushDot = () => {

         for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', () => {

               removeActiveDots()

               dots[i].classList.add('--active')
               step = i

               infinityScroll()
               scrolling()
               transitionScroll()
               clearInterval(intervalScroll)
            })
         }
      }
      pushDot()

      // scroll function
      const scrolling = () => container.style.transform = `translate3d(-${step * slide.offsetWidth}px,0,0)`

      // swipe, drag
      let startX, moveX, endX

      const touchStart = event => startX = event.touches[0].clientX
      const touchMove = event => moveX = event.touches[0].clientX

      const touchEnd = () => {

         endX = startX - moveX

         if (endX > 80) {
            step++
            if (step >= slides.length) step = 0
            infinityScroll()
            scrolling()
            activeDot()
            transitionScroll()
            clearInterval(intervalScroll)
         }

         if (endX < -80) {
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

      container.addEventListener('touchstart', touchStart, { passive: true })
      container.addEventListener('touchmove', touchMove, { passive: true })
      container.addEventListener('touchend', touchEnd, { passive: true })

      // transition   
      const transitionScroll = () => transition ? container.style.transition = `all ${transitionTime}s ${transitionType}` : false

   }
}

export const { modal: myModal, slider: mySlider } = myObject