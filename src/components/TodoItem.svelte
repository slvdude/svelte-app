<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { tweened, spring } from 'svelte/motion';
    import { cubicIn } from 'svelte/easing';
    import { interpolateLab } from 'd3-interpolate';
    export let title;
    export let done;
    let container;
    const dispatch = createEventDispatcher();
    const doneMotion = tweened('#D24A31', {
        delay: 0,
        duration: 250,
        easing: cubicIn,
        interpolate: interpolateLab
    });

    const containerPosition = spring({
        left: -100,
        top: -100
    }, {
        stiffness: 0.1,
        damping: 0.1
    });

    function handleDoneChange(event) {
        doneMotion.set(event.target.checked ?'#333': '#D24A31');
        dispatch('doneChange', event.target.checked);
    }

    function handleTextChange(event) {
        dispatch('textChange', event.target.value);
    }

    function handleRemoveClick() {
        dispatch('remove');
    }

    onMount(() => {
        doneMotion.set(done ?'#333': '#D24A31');
        containerPosition.set({
            left: container.offsetLeft + 441,
            top: container.offsetTop + 50 
        });
    });

</script>
<div class="outer-container">
    <div class="main-container" style="border: 2px solid {$doneMotion}; left: {$containerPosition.left}px; top: {$containerPosition.top}px;" bind:this={container}>
        <label class="checkbox-container">
            <input type="checkbox" checked={done} on:input={handleDoneChange} />
            <span class="checkmark"></span>
        </label>
        <input type="text" class="title" class:done value={title} on:input={handleTextChange}/>
        <p class="remove-btn" on:click={handleRemoveClick}>Remove</p>
    </div> 
</div>


<style>
    .outer-container {
        width: 600px;
        position: relative;
        height: 50px;
        margin-top: 10px;
    }
    .main-container {
        margin: 0 auto;
        width: 600px;
        display: flex;
        align-items: center;
        height: 50px;
        border-radius: 4px;
        background-color: #333;
        color: #fff;
        margin-bottom: 10px;
        padding: 0 12px;
        position: absolute;
    }

    .checkbox-container {
        display: block;
        position: relative;
        bottom: 5.5px;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .checkbox-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
        border-radius: 2px;
    }

    .checkbox-container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    .checkbox-container input:checked ~ .checkmark {
        background-color: #308f40;
    }

    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    .checkbox-container input:checked ~ .checkmark:after {
        display: block;
    }

    .checkbox-container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    p {
        margin: 0;
    }

    .remove-btn {
        font-weight: bold;
        color: rgb(235, 61, 61);
        cursor: pointer;
    }

    .remove-btn:hover {
        color:rgb(236, 27, 27);
    }

    .title {
        flex: 1;
        background-color: #333;
        color: #fff;
        border: none;
        outline: none;
        margin-bottom: 0px;
    }

    .done {
        text-decoration: line-through;
    }
</style>