import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
//import API from '../../services/connection';
import { HiOutlineTrash } from 'react-icons/hi';
import { RiRecordCircleLine } from 'react-icons/ri';
import { FaPlay, FaPlus } from 'react-icons/fa';
import './styles.css';

export default function LandingPage(){

    //const [editedElement, setEdited] = useState(null);
    const [animationData, setAnimationDataValues] = useState([]);

    const [selectedElement, setSelectedElement] = useState("");
    const [arrayDeObjetos, setArrayDeObjetos] = useState([]);
    const [rulerTimestamps, setRulerTimestamps] = useState([]);
    const [contextMenuEnabled, openContextMenu] = useState(false);

    window.addEventListener("keyup", deleteSelectedElement, true);

    window.onload = () => {

        var clicks = 0;
        var positionToAdd = 0;
        
        function watchKeyframe(e){
            clicks ++;
            const keyFrameToAdd = document.createElement("div");

            const keyframesCount = document.querySelectorAll('.keyFrame').length;

            keyFrameToAdd.className = "keyFrame";
            keyFrameToAdd.id = `keyFrame${keyframesCount + 1}`;
            keyFrameToAdd.draggable = "false";

            if(e.target.id.toString().substring(0, 8) === "keyFrame"){
                setSelectedElement(e.target);

                if(e.type === "contextmenu"){
                    if(contextMenuEnabled === false){
                        openContextMenu(true);
                        const contextMenu = document.getElementById("contextMenu");
                        contextMenu.style.left = e.target.getBoundingClientRect().left + (e.target.offsetHeight/2) + "px";
                        contextMenu.style.top = e.target.getBoundingClientRect().top + (e.target.offsetWidth/2) + "px";
    
                        document.addEventListener('mouseup', enableContextMenu, false);
                        
                        function enableContextMenu() {
                            setTimeout(() => {
                                openContextMenu(false);
                            }, 10);

                            document.removeEventListener('mouseup', enableContextMenu, false);
                        }

                    }

                    e.preventDefault();
                }

            }

            if(clicks === 2){
                if(e.target.className === "timelineObject"){
                    if (e.type === "touchstart") {
                        var xTouch = e.touches[0].clientX - e.target.offsetLeft + timelineSheet.scrollLeft;
                        positionToAdd = xTouch - timelineObjects.offsetWidth;
                    } else {
                        var x = e.clientX - e.target.offsetLeft + timelineSheet.scrollLeft;
                        positionToAdd = x - timelineObjects.offsetWidth;
                    }
    
                    keyFrameToAdd.style.left = positionToAdd - 15 + "px";
                    e.target.appendChild(keyFrameToAdd);

                    defineData(e, positionToAdd);
                }
            }

            setTimeout(() => {
                clicks = 0;
            }, 500);
        }

        const screenWidth = window.screen.width;

        const timeline = document.querySelector(".timeline");
        const timelineSheet = document.querySelector(".timelineSheet");
        const timelineRuler = document.querySelector(".timelineRuler");
        const timelineRulerDiv = document.querySelector(".timelineRulerDiv");
        const timelineObjects = document.querySelector(".timelineObjects");
        const timelineSheetObjects = document.querySelector(".timelineSheetObjects");


        setRulerTimestamps(Array.apply(null, Array(screenWidth)));

        timelineSheetObjects.style.width = timelineRulerDiv.offsetWidth + "px";
        timelineObjects.style.height = timelineSheet.style.height;
        timelineSheet.style.height = timelineObjects.style.height;

        timelineObjects.onscroll = () => {
            timelineSheet.scrollTop =  timelineObjects.scrollTop;
        }
        timelineSheet.onscroll = () => {
            timelineObjects.scrollTop =  timelineSheet.scrollTop;
            timelineRuler.scrollLeft =  timelineSheet.scrollLeft;
        }

        //Element dragging section -----------------------------------------------------------------------------------
        const container = document.getElementById("userPageWrap");
        var activeItem = null;
        var active = false;

        //Drag event listeners for container elements
        container.addEventListener("touchstart", dragStart, false);
        container.addEventListener("touchend", dragEnd, false);
        container.addEventListener("touchmove", drag, false);
            container.addEventListener("mousedown", dragStart, false);
            container.addEventListener("mouseup", dragEnd, false);
            container.addEventListener("mousemove", drag, false);

        //Drag event listeners for timeline keyframes
        timeline.addEventListener("touchstart", dragStart, false);
        timeline.addEventListener("touchend", dragEnd, false);
        timeline.addEventListener("touchmove", drag, false);
            timeline.addEventListener("mousedown", dragStart, false);
            timeline.addEventListener("mouseup", dragEnd, false);
            timeline.addEventListener("mousemove", drag, false);


        function dragStart(e) {
            if (e.target !== e.currentTarget) {
                active = true;

                if(e.target.id === "itemToDrag" || e.target.id.toString().substring(0, 8) === "keyFrame" || e.target.id === "timelineCursor"){
                    activeItem = e.target;
                }
                else{
                    return;
                }

                if (activeItem !== null) {
                    if(activeItem.id === "itemToDrag"){
                        if (!activeItem.xOffset) {
                            activeItem.xOffset = 0;
                        }
    
                        if (!activeItem.yOffset) {
                            activeItem.yOffset = 0;
                        }
    
                        if (e.type === "touchstart") {
                            activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                            activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
                        }
                        else {
                            activeItem.initialX = e.clientX - activeItem.xOffset;
                            activeItem.initialY = e.clientY - activeItem.yOffset;
                        }
                    }
                    else if(activeItem.id.toString().substring(0, 8) === "keyFrame" || activeItem.id === "timelineCursor"){
                        if (!activeItem.xOffset) {
                            activeItem.xOffset = 0;
                        }

                        if (e.type === "touchstart") {
                            activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                        }
                        else {
                            activeItem.initialX = e.clientX - activeItem.xOffset;
                        }
                    }
                }
                else{
                    return;
                }
            }
        }

        function dragEnd(e) {
            if (activeItem !== null) {
                if(activeItem.id === "itemToDrag"){
                    activeItem.initialX = activeItem.currentX;
                    activeItem.initialY = activeItem.currentY;
                }
                else if(activeItem.id.toString().substring(0, 8) === "keyFrame" || activeItem.id === "timelineCursor"){
                    activeItem.initialX = activeItem.currentX;
                }
            }

            active = false;
            activeItem = null;
        }

        function drag(e) {
            if (active) {
                if(activeItem !== null){
                    if (e.type === "touchmove") {
                        e.preventDefault();

                            if(activeItem.id === "itemToDrag"){
                                activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
                                activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
                            }
                            else if(activeItem.id.toString().substring(0, 8) === "keyFrame" || activeItem.id === "timelineCursor"){
                                activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
                            }
                        }
                    else {
                        if(activeItem.id === "itemToDrag"){
                            activeItem.currentX = e.clientX - activeItem.initialX;
                            activeItem.currentY = e.clientY - activeItem.initialY;
                        }
                        else if(activeItem.id.toString().substring(0, 8) === "keyFrame" || activeItem.id === "timelineCursor"){
                            activeItem.currentX = e.clientX - activeItem.initialX;
                        }
                    }
    
                    if(activeItem.id === "itemToDrag"){
                        activeItem.xOffset = activeItem.currentX;
                        activeItem.yOffset = activeItem.currentY;

                        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
                    }
                    else if(activeItem.id.toString().substring(0, 8) === "keyFrame" || activeItem.id === "timelineCursor"){
                        activeItem.xOffset = activeItem.currentX;

                        setTranslate(activeItem.currentX, 0, activeItem);
                    }
                }
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }

        timelineSheetObjects.addEventListener("mousedown", watchKeyframe, false);
        timelineSheetObjects.addEventListener("touchstart", watchKeyframe, false);
        timelineSheetObjects.addEventListener("contextmenu", watchKeyframe, false);

    }

    function deleteSelectedElement(event){
        if(event === "contextmenu"){
            if(selectedElement !== "" && selectedElement !== null && selectedElement !== undefined){
                animationData.splice(parseInt(selectedElement.id.toString().substring(8, 9)) - 1, 1);
                selectedElement.remove();
            }
        }

        if(event.key === 'Del' || event.key === 'Delete' || event.keyCode === 46){
            if(selectedElement !== "" && selectedElement !== null && selectedElement !== undefined){
                animationData.splice(parseInt(selectedElement.id.toString().substring(8, 9)) - 1, 1);
                selectedElement.remove();
            }
        }
    }

    const addObject = (e) => {
        const timelineObjectsList = document.querySelector(".timelineObjectsList");
        const line = document.createElement("li");
        var lastElementID;

        if(timelineObjectsList.lastChild !== null){
            lastElementID = parseInt((timelineObjectsList.lastChild.id.toString()).substring(6, 8)) + 1;
        }
        else{
            lastElementID = "1";
        }

        line.innerHTML = "Objeto " + lastElementID + " > Posição X, Y";
        line.className = "timelineObject";
        line.id = "objeto" + lastElementID;

        timelineObjectsList.appendChild(line);
        setArrayDeObjetos(Array.apply(null, Array(timelineObjectsList.childElementCount)));
    }

    function defineData(e, positionToAdd){
        const animData = {
            'affectedObject': {
                'affectedObjectID': e.target.id,
                'affectedProperty': {
                    'name': "",
                    'value': 0
                },
                'time': positionToAdd/100
            }
        };
        
        setAnimationDataValues(animationData => [...animationData, animData]);
    }

    function playAnim(){
        console.log(animationData)
    }

    //async function sendData(e){
        //e.preventDefault();

        //const response = await API.get(`/criar?conteudo=${content}&filename=${nome}`);
        //console.log(response);
    //}

    //const teste = () => {
        //const values = editedElement.style.transform.split(/\w+\(|\);?/);
        //const transform = values[1].split(/,\s?/g).map(parseInt);

        //console.log(transform[0]);
        //editedElement.style.transform = `translate3d(${transform[0]}px, ${transform[1]}px, 0)`;
    //};

    return (
        <div className="wrapDiv">
            { contextMenuEnabled ? 
                <div className="contextMenu" id="contextMenu">
                    <button className="contextMenuButton" onClick={e => deleteSelectedElement("contextmenu")}> <HiOutlineTrash size={"2.8vh"}/> <h1 className="contextMenuButtonText">Remover Keyframe</h1></button>
                </div> :
                 ""
            }
            <div className="userPageWrap" id="userPageWrap">
                <div className="userPage">
                    <div className="exampleItem" id="itemToDrag"></div>
                </div>
            </div>
            <section className="timelineSection">
                <div className="timelineWrap">
                    <div className="timelineAttributes">
                        <div className="timelineOptions">
                            <div className="timelineOptionsButtons">
                                <button className="timelineOptionsRecordButton">
                                    <RiRecordCircleLine className="timelineOptionsRecord" color="white"/>
                                    REC
                                </button>
                                <button onClick={playAnim} className="timelineOptionsPlayButton">
                                    <FaPlay className="timelineOptionsPlay" color="#ffffff"/>
                                    PLAY
                                </button>
                            </div>
                            <div className="timelineOptionsAddField">
                                <button onClick={addObject} className="timelineOptionsAddButton">
                                    <FaPlus className="timelineOptionsAdd"/>
                                </button>
                            </div>
                            <div className="timelineOptionsRuler">
                                <h1 className="timelineOptionsRulerLabel">Segundos: </h1>
                            </div>
                        </div>
                        <div className="timelineObjects">
                            <ul className="timelineObjectsList">
                            </ul>
                        </div>
                    </div>
                    <div className="timeline">
                        <div className="timelineRuler">
                            <div className="timelineRulerDiv">
                                {rulerTimestamps.map((element, index) => (
                                    <h1 className="timelineRulerTimestamps" key={index}>{index + 1}</h1>
                                ))}
                            </div>
                        </div>
                        <div className="timelineSheet">
                            <div className="timelineSheetObjects">
                                <div className="timelineCursor" id="timelineCursor"></div>
                                {arrayDeObjetos.map((element, index) => (
                                    <li className="timelineObject" key={"obj" + index + 1} id={index + 1}></li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}