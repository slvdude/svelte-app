<script>
	import { v4 as uuid } from 'uuid';
	import { onMount } from 'svelte';
	import AddTodoItem from './components/AddTodoItem.svelte';
	import TodoItem from './components/TodoItem.svelte';
	import { todoItems } from './store/store.js';
	import TodoApi from './utils/todoApi.js';

	function handleAddClick(event) {
		console.log(event);
		todoItems.update(items => {
			return [...items, {
					id: uuid(),
					text: event.detail,
					done: false
				}];
		});
		TodoApi.save($todoItems);
	}

	function handleDoneChange(id, done) {
		todoItems.update(items => {
			return items.map(item => {
				if(item.id === id) {
					return {
						...item,
						done
					};
				} else {
					return item;
				}
			});
		});
		TodoApi.save($todoItems);
	}

	function handleTextChange(id, text) {
		todoItems.update(items => {
			return items.map(item => {
				if(item.id === id) {
					return {
						...item,
						text
					};
				} else {
					return item;
				}
			});
		});
		TodoApi.save($todoItems);
	}

	function handleRemoveClick(id) {
		todoItems.update(items => {
			return items.filter(item => {
				return item.id !== id;
			});
		});
		TodoApi.save($todoItems);
	}

	onMount(async () => {
		$todoItems = await TodoApi.getAll();
		//await TodoApi.getAll();
	});
</script>

<h1>Todo app</h1>
<div class="counter">
	{$todoItems.filter(item => item.done).length}/{$todoItems.length}
</div>
<AddTodoItem on:add={handleAddClick} />



{#each $todoItems as {id, text, done} (id)}
    <TodoItem bind:title = {text} {done} on:doneChange={event => handleDoneChange(id, event.detail)} on:textChange={event => handleTextChange(id, event.detail)} on:remove={handleRemoveClick(id)}/>
    {:else}
        <p>There are no items. Add your first task!</p>
{/each}
<!--{JSON.stringify($todoItems)}!-->

<style>
	:global(*::before) {
		box-sizing: border-box;
	}

	:global(*::after) {
		box-sizing: border-box;
	}

	:global(*) {
		margin: 0px;
		padding: 0px;
		box-sizing: border-box;
	}

	:global(body) {
		background-color: #a8a1a1;
		padding: 20px;
	}

	h1 {
		text-align: center;
		text-transform: uppercase;
	}

	p {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        text-transform: uppercase;
    }

	.counter {
		margin: 10px auto;
		text-align: center;
		font-size: 30px;
		font-weight: bold;
	}

</style>