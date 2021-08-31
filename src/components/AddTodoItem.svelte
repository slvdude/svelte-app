<script>
    import { createEventDispatcher } from 'svelte';

    let title = "Enter your task!";

    const dispatch = createEventDispatcher();

    let text = '';

    function handleClick() {
        //todo
        dispatch('add', text);
        text = '';
    }
</script>
<div class="main-container">
    <label class="custom-field">
        <input type="text" bind:value = {text}/>
        <span class="placeholder">{ title }</span>
        <button class="todo-btn" on:click={handleClick}>Add Todo</button>
    </label>
</div>

<style>
    .main-container {
        margin: 20px auto;
        background-color: #333;
        width: 600px;
        padding-bottom: 22px;
        border-radius: 4px;
    }

    .custom-field {
        display: flex;
        font-size: 14px;
        position: relative;
        --field-padding: 12px;
        border-top: 20px solid transparent;
        width: 80%;
        margin: 0 auto;
    }

    .custom-field input {
        border: none;
        -webkit-appearance: none;
        -ms-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: #f2f2f2;
        padding: 12px;
        border-radius: 0px;
        font-size: 14px;
        padding: var(--field-padding);
        width: 100%;
        outline: none;
        margin-bottom: 0px;
    }

    .custom-field .placeholder {
        display: block;
        position: absolute;
        left: 12px;
        top: 22px;  
        font-weight: bold;
        transform: translateY(-50%);
        width: calc(100% - 24px);  
        color: rgb(182, 182, 182);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        left: var(--field-padding);
        width: calc(100% - (var(--field-padding) * 2));
        transition: 
            top 0.3s ease,
            color 0.3s ease,
            font-size 0.3s ease;
    }

    .custom-field input:focus + .placeholder {
        top: -10px;
        font-size: 10px;
        color: #fff;
    }
    
    .custom-field input:focus {
        background-color: rgba(206, 205, 205, 0.884);
    }

    .custom-field input:not(:placeholder-shown) + .placeholder
    .custom-field input:focus + .placeholder {
        top: -10px;
        font-size: 14px;
        color: #222;
    }

    .todo-btn {
        margin-bottom: 0px;
        border-radius: 0px;
        width: 20%;
        border: none;
        transition: 0.3s ease;
        color: #333;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }

    .todo-btn:hover {
        background-color: #333;
        color: #fff;
        border: 0.5px solid#fff;
        font-weight: bold;
    }
</style>