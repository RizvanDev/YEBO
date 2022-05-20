"use strict"

import { mySlider, myModal } from "./modules/my-methods.js"


const header = document.querySelector('.header')

// preload
const preloading = () => {

   let count = 0

   const load = () => {

      ++count

      document.querySelector('.preload__loading').innerHTML = `${count}%`
      document.querySelector('.preload__line').style.width = `${count}%`

      if (count === 100) {
         clearInterval(loadInterval)
         document.querySelector('.preload').style.display = 'none'
         document.body.classList.remove('--lock')
      }
   }
   const loadInterval = setInterval(load, 20)
}
window.addEventListener('load', preloading)

// header and title time
setTimeout(() => document.querySelector('.main__title').style.visibility = 'visible', 2500)
setTimeout(() => header.classList.remove('--hidden'), 4000)

// show header
const showHeader = () => {

   const move = event => event.clientY <= 50 ? header.classList.remove('--hidden') : false

   const invisibleHeader = () => {

      if (document.body.clientWidth > 767 && window.pageYOffset > 120) {
         header.classList.add('--hidden')
         window.addEventListener('mousemove', move)
      } else {
         header.classList.remove('--hidden')
      }

      if (document.body.clientWidth > 767 && window.pageYOffset > 826) {
         header.classList.add('--headerColor')
      } else {
         header.classList.remove('--headerColor')
      }
   }

   return window.addEventListener('scroll', invisibleHeader)
}
showHeader()

// share 
setTimeout(() => document.querySelector('.share').classList.add('--show-icons'), 4000)

// mobile MENU
const clickMobileMenu = () => {
   header.classList.toggle('--active')
   header.classList.contains('--active') ? document.body.classList.add('--lock') : document.body.classList.remove('--lock')
}

if (document.querySelector('.menu__icon')) document.querySelector('.menu__icon').addEventListener('click', clickMobileMenu)

// contact modal
const showContactModal = () => {
   return myModal({
      openModal: document.querySelector('.open-contact'),
      modal: document.querySelector('.contact-modal'),
      modalContainer: document.querySelector('.contact-modal__container'),
      modalClose: document.querySelector('.contact-modal__close'),
   })
}
showContactModal()

// navigation scroll
const navigationScroll = () => {

   const scrollStart = document.querySelectorAll('.scrollStart')
   const scrollEnd = document.querySelectorAll('.scrollEnd')

   if (scrollEnd.length > 0) {

      scrollStart.forEach((_, index) => {
         scrollStart[index].addEventListener('click', event => {

            event.preventDefault()

            let height = scrollEnd[index].offsetTop

            window.scrollTo({
               top: height,
               behavior: 'smooth'
            })

            if (document.body.clientWidth < 768) clickMobileMenu()
         })
      })
   }
}
navigationScroll()

// articles slider
const articlesSlider = () => {
   return mySlider({
      container: document.querySelector('.articles-slider__container'),
      slides: document.getElementsByClassName('articles-slider__slide'),
      slide: document.querySelector('.articles-slider__slide'),
      prevBtn: document.querySelector('.articles-slider__prev'),
      nextBtn: document.querySelector('.articles-slider__next'),
      dots: document.getElementsByClassName('articles-slider__dot'),
      dotsContainer: document.querySelector('.articles-slider__dots'),
      auto: true,
      autoTime: 4500,
      transition: true,
      transitionTime: 0.6,
      transitionType: 'ease',
      infinity: true,
   })
}
articlesSlider()

// email
const emailForm = () => {
   const emailDone = event => {
      if (event.target.validity.valid) {
         return document.querySelector('.form__btn').classList.add('--emailDone')
      } else {
         return document.querySelector('.form__btn').classList.remove('--emailDone')
      }
   }

   return document.querySelector('.form__input').addEventListener('keyup', emailDone)
}
emailForm()

// callback btn, modal
const callbackUser = () => {

   const callbackBtn = document.querySelector('.callback-btn')
   const modal = document.querySelector('.callback-modal')
   const modalContainer = document.querySelector('.callback-modal__container')
   const form = document.querySelector('.callback-modal__form')
   const callbackFormBtn = document.querySelector('.callback-modal__send-btn')


   const showBtn = () => window.pageYOffset > 100 ? callbackBtn.classList.add('--visible-btn') : false

   const showModal = () => {
      return myModal({
         openModal: callbackBtn,
         modal: modal,
         modalContainer: modalContainer,
         modalClose: document.querySelector('.callback-modal__close'),
      })
   }
   showModal()

   const callbackFormDone = () => {

      form.addEventListener('click', e => {

         if (e.target.type === 'number') e.target.addEventListener('keyup', () => {
            e.target.value.length >= 10 ? callbackFormBtn.classList.add('--done') : callbackFormBtn.classList.remove('--done')
         })

         const closed = () => {
            modal.classList.remove('--opened')
            modalContainer.classList.remove('--opened')
            document.body.classList.remove('--lock')
            callbackBtn.remove('--visible-btn')
         }

         if (e.target.type === 'submit' && callbackFormBtn.classList.contains('--done')) {
            modalContainer.classList.add('--load')
            setTimeout(() => modalContainer.classList.add('--show'), 2000)
            setTimeout(closed, 6000)
         }
      })

      return form.addEventListener('submit', event => event.preventDefault())
   }
   callbackFormDone()

   return window.addEventListener('scroll', showBtn)
}
callbackUser()