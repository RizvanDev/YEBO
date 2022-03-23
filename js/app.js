"use strict"

import { mySlider, myModal } from "./modules/my-methods.js"


const header = document.querySelector('.header')

// header and title time
const animationTop = () => {
   setTimeout(() => header.classList.remove('--hidden'), 2800)
   setTimeout(() => document.querySelector('.main__title').style.visibility = 'visible', 1000)
}
animationTop()

// show header
const showHeader = () => {

   const move = event => event.clientY <= 50 ? header.classList.remove('--hidden') : false

   const invisibleHeader = () => {

      if (window.pageYOffset > 120) {
         header.classList.add('--hidden')
         window.addEventListener('mousemove', move)
      } else {
         header.classList.remove('--hidden')
      }

      if (document.body.clientWidth > 767) {
         window.pageYOffset > 826 ? header.style.backgroundColor = '#282f35' : header.style.backgroundColor = '#0009'
      }
   }

   return window.addEventListener('scroll', invisibleHeader)
}
showHeader()

// mobile MENU
const clickMobileMenu = () => {
   header.classList.toggle('--active')
   header.classList.contains('--active') ? document.body.classList.add('--lock') : document.body.classList.remove('--lock')
}
if (document.querySelector('.menu__icon')) document.querySelector('.menu__icon').addEventListener('click', clickMobileMenu)

// contact modal
const showContactModal = () => {

   const modal0bj = {
      openModal: document.querySelector('.open-contact'),
      modal: document.querySelector('.contact-modal'),
      modalContainer: document.querySelector('.contact-modal__container'),
      modalClose: document.querySelector('.contact-modal__close'),
   }

   return myModal(modal0bj)
}
showContactModal()

// navigation scroll
const navigationScroll = () => {

   const scrollStart = document.querySelectorAll('.scrollStart')
   const scrollEnd = document.querySelectorAll('.scrollEnd')

   if (scrollEnd.length > 0) {

      for (let i = 0; i < scrollStart.length; i++) {

         const scrollingStart = event => {
            event.preventDefault()

            let height = scrollEnd[i].offsetTop

            window.scrollTo({
               top: height,
               behavior: 'smooth'
            })

            if (document.body.clientWidth < 768) clickMobileMenu()
         }

         scrollStart[i].addEventListener('click', scrollingStart)
      }
   }
}
navigationScroll()

// articles slider
const articlesSlider = () => {

   const sliderObj = {
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
   }

   return mySlider(sliderObj)
}
articlesSlider()

// callback btn, modal
const callbackUser = () => {

   const callbackBtn = document.querySelector('.callback-btn')
   const modal = document.querySelector('.callback-modal')
   const modalContainer = document.querySelector('.callback-modal__container')
   const form = document.querySelector('.callback-modal__form')
   const callbackFormBtn = document.querySelector('.callback-modal__send-btn')


   const showBtn = () => window.pageYOffset > 100 ? callbackBtn.classList.add('--visible-btn') : false

   const showModal = () => {
      const modal0bj = {
         openModal: callbackBtn,
         modal: modal,
         modalContainer: modalContainer,
         modalClose: document.querySelector('.callback-modal__close'),
      }

      return myModal(modal0bj)
   }
   showModal()

   const formDone = () => {

      form.addEventListener('click', (e) => {

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
            setTimeout(() => closed(), 6000)
         }
      })

      return form.addEventListener('submit', event => event.preventDefault())
   }
   formDone()

   return window.addEventListener('scroll', showBtn)
}
callbackUser()

// share 
setTimeout(() => document.querySelector('.share').classList.add('--show-icons'), 3500)