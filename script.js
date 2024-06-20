document.addEventListener('DOMContentLoaded', () => {
    const tags = [
      'React', 'Hands On', 'Live Coding', 'Angular', 'Vue JS', 'JS Fundamentals', 
      'Typescript', 'Browser/DOM', 'API', 'Router', 'Forms', 'Jest', 'Vue', 
      'Templates', 'Directives', 'Routing', 'State management', 
      'Asynchronous programming', 'React Js', 'Hooks', 'JSX', 'CSS', 'flex', 'DOM'
    ];
    
    const addedTags = new Set(['Figma', 'CSS', 'HTML']);
    const tagInput = document.getElementById('tag-input');
    const suggestions = document.getElementById('suggestions');
    const tagContainer = document.querySelector('.tag-container');
  
    tagInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      suggestions.innerHTML = '';
      if (query) {
        const filteredTags = tags.filter(tag => tag.toLowerCase().includes(query) && !addedTags.has(tag));
        filteredTags.forEach(tag => {
          const suggestion = document.createElement('div');
          suggestion.innerHTML = highlightMatch(tag, query);
          suggestion.addEventListener('click', () => addTag(tag));
          suggestions.appendChild(suggestion);
        });
        suggestions.style.display = 'block';
      } else {
        suggestions.style.display = 'none';
      }
    });
  
    tagInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && tagInput.value) {
        addTag(tagInput.value);
      }
    });
  
    function highlightMatch(tag, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return tag.replace(regex, '<span class="highlight">$1</span>');
    }
  
    function addTag(tag) {
      if (!addedTags.has(tag)) {
        addedTags.add(tag);
        const tagElement = document.createElement('div');
        tagElement.classList.add('tag');
        tagElement.dataset.tag = tag;
        tagElement.innerHTML = `${tag} <span class="remove-tag">×</span>`;
        tagContainer.appendChild(tagElement);
        tagInput.value = '';
        suggestions.style.display = 'none';
  
        tagElement.querySelector('.remove-tag').addEventListener('click', () => removeTag(tagElement, tag));
      }
    }
  
    function removeTag(tagElement, tag) {
      tagContainer.removeChild(tagElement);
      addedTags.delete(tag);
      updateSuggestions();
    }
  
    function updateSuggestions() {
      const query = tagInput.value.toLowerCase();
      suggestions.innerHTML = '';
      if (query) {
        const filteredTags = tags.filter(tag => tag.toLowerCase().includes(query) && !addedTags.has(tag));
        filteredTags.forEach(tag => {
          const suggestion = document.createElement('div');
          suggestion.innerHTML = highlightMatch(tag, query);
          suggestion.addEventListener('click', () => addTag(tag));
          suggestions.appendChild(suggestion);
        });
        suggestions.style.display = 'block';
      } else {
        suggestions.style.display = 'none';
      }
    }
  
    document.querySelectorAll('.remove-tag').forEach(removeTagIcon => {
      removeTagIcon.addEventListener('click', (e) => {
        const tagElement = e.target.parentElement;
        const tag = tagElement.dataset.tag;
        removeTag(tagElement, tag);
      });
    });
  });
  