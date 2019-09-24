/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
 
import interactive from '@salesforce/resourceUrl/interact';


export default class InteractiveView extends LightningElement {

    @track test

    async renderedCallback(){
        
        try {
            
            await loadScript(this, interactive + '/interact.js')

            console.log('LOADED _INTERACTIVE JS =>')
            // eslint-disable-next-line no-undef
            const _interact = interact
            console.dir(_interact)
            
            // target elements with the "draggable" class
            _interact('.draggable')
            .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            modifiers: [
                _interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
                })
            ],
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
                var textEl = event.target.querySelector('p')

                // eslint-disable-next-line no-unused-expressions
                textEl && (textEl.textContent =
                'moved a distance of ' +
                (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                            Math.pow(event.pageY - event.y0, 2) | 0))
                    .toFixed(2) + 'px')
            }
            })

            // eslint-disable-next-line no-inner-declarations
            function dragMoveListener (event) {
                var target = event.target
                // keep the dragged position in the data-x/data-y attributes
                var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
                var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

                // translate the element
                target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)'

                // update the posiion attributes
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
            }

            // this is used later in the resizing and gesture demos
            window.dragMoveListener = dragMoveListener

            console.dir(window.dragMoveListener)


            // this is used later in the resizing and gesture demos
            //secureWindow.dragMoveListener = dragMoveListener

            
        } catch (error) {
            console.error( error )
        }
    }
}