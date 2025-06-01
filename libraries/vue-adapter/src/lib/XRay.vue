<script setup lang="ts">
import { PContainer } from '@labb/dx-engine';
import { ref } from 'vue';

const {container} = defineProps<{
    container: PContainer;
}>();

const display = ref(false);
function toggleDisplay() {
    display.value = !display.value;
    (window as any).$pContainer = container;
    setTimeout(() => {
        dragElement(document.getElementById("draggable"));
    });
}

function dragElement(elmnt: HTMLElement | null) {
    if (elmnt === null) {
        return;
    }
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = document.getElementById(elmnt.id + "header");
    if (header) {
        // if present, the header is where you move the DIV from:
        header.onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: MouseEvent) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e: MouseEvent) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        if (elmnt) {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const propKeys = Object.keys(container.config);
const stateKeys = Object.keys(container.pconnect.getStateProps());

function stringify(val: any) {
    return JSON.stringify(val, null, 2);
}

const name = container.pconnect.getRawMetadata().name;
</script>

<template>
    <div class="xray">
        <pre class="header"
            @click="toggleDisplay">{{ container.id + (name ? `: ${name}` : '') }} <span class="headericon">{{ display ? '-' : '?' }}</span></pre>
        <slot></slot>
        <div class="expanded" id="draggable" v-if="display">
            <pre id="draggableheader"
                class="header">{{ container.id }} <span class="headericon" :style="'cursor: pointer;'" @click="toggleDisplay">{{ display ? 'X' : '?' }}</span></pre>
            <pre>
                <table>
                    <caption>Config properties</caption>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="key in propKeys" :key>
                            <td><strong>{{ key }}</strong></td>
                            <td>{{ stringify(container.config[key]) }}</td>
                        </tr>
                    </tbody>
                </table>
                <table v-if="stateKeys.length > 0">
                    <caption>State properties</caption>
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="key in stateKeys" :key>
                            <td><strong>{{ key }}</strong></td>
                            <td>{{ stringify(container.pconnect.getStateProps()[key]) }}</td>
                        </tr>
                    </tbody>
                </table>
            </pre>
        </div>
    </div>
</template>

<style scoped>
.xray {
    display: block;
    margin: 2px;
    padding: 2px;
    position: relative;
    border: 1px solid green;
}

.header {
    cursor: move;
    margin: 0.3em 0;
}

.headericon {
    float: right;
    cursor: pointer;
    margin-right: 5px;
}

.expanded {
    white-space: pre-wrap;
    position: absolute;
    background-color: white;
    color: black;
    top: 0;
    left: 0;
    z-index: 10;
    border: 1px solid;
    padding: 10px;
}

table {
    border-collapse: collapse;
}

td,
th {
    border: 1px solid #ddd !important;
    padding: 2px !important;
    max-width: 500px;
    overflow: scroll;
}

tr:nth-child(even) {
    background-color: #f2f2f2 !important;
}

tr:hover {
    background-color: #ddd !important;
}

th {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    text-align: left !important;
    background-color: #04AA6D !important;
    color: white !important;
}
</style>