<script>
    import { createEventDispatcher } from 'svelte';
    export let title;
    export let done;

    const dispatch = createEventDispatcher();

    function handleDoneChange(event) {
        dispatch('doneChange', event.target.checked);
    }

    function handleTextChange(event) {
        dispatch('textChange', event.target.value);
    }

    function handleRemoveClick() {
        dispatch('remove');
    }

</script>

<div class="main-container">
    <label class="checkbox-container">
        <input type="checkbox" checked={done} on:input={handleDoneChange} />
        <span class="checkmark"></span>
    </label>
    <input type="text" class="title" class:done value={title} on:input={handleTextChange}/>
    <p class="remove-btn" on:click={handleRemoveClick}>Remove</p>
</div>

<style>
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