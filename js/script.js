'use strict';

const todoControl = document.querySelector('.todo-control'),
   headerInput = document.querySelector('.header-input'),
   todoList = document.querySelector('.todo-list'),
   todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

for (let key in localStorage) {
   if (key === 'todoData') {
      todoData = JSON.parse(localStorage[key]);
   }
}
function addLocalStorageItem() {
   localStorage.todoData = JSON.stringify(todoData);
 }
  
   // функция, которая будет рендорить,(добовлять ) вёрстку на страницу
const render = function() {
   // чистка от предыдущих данных
   todoList.textContent = ''; 
   todoCompleted.textContent = ''; 
   localStorage.setItem('todoData', JSON.stringify(todoData));
   // функция render перебирает todoData
   todoData.forEach(function(item){
     // добавляем вёрстку
      const li = document.createElement('li');
      // для li добавим класс, который возьмём из вёрстки в html 
      li.classList.add('todo-item');
      // и теперь в этот li будем добавлять вёрстку по строчкам
      // вместо Сварить кофе, надо добавить значение value из объекта
      // li.innerHTML = '<span class="text-todo">Сварить кофе</span>'
      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
           '<button class="todo-remove"></button>' +
           '<button class="todo-complete"></button>' +
        '</div>';
         // добавим это на страницу в  новые дела
         // условие,чтобы выполненные задачи и невыполненные задачи не смешивались
      if(item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }
      // получаем кнопку
      const btntodoCompleted = li.querySelector('.todo-complete');
      // на todoCompleted навешиваем собития
      btntodoCompleted.addEventListener('click', function() {
         // берём item и меняем на противоположное
         item.completed = !item.completed;
         // и чтобы это сработало снова вызываем функцию render 
         render();
         addLocalStorageItem();
      });
      // удаление в корзину
      const btnTodoDelete = li.querySelector('.todo-remove');
      btnTodoDelete.addEventListener('click', function () {
         todoData.splice(todoData.indexOf(item), 1);
         render();
         addLocalStorageItem();
       });
   });
};

// Навешиваем событие на форму
todoControl.addEventListener('submit', function(event) {
   event.preventDefault();  // отменяем стандартное поведение браузера

   // условие если поле пустое код несработает
   if (headerInput.value !== '') {
      const newTodo = {
        value: headerInput.value,
        completed: false
      };
      headerInput.value = '';
   // запушиваем новый объект
   todoData.push(newTodo);
   addLocalStorageItem();
   //вызываем функцию render, чтобы обновился список дел
   render();
   }
});

// должно рендориться сразу как только запустилась страница
render();

