let FieldService =  {
	getField: function(id) {
		return {
		  "label": "Sales region",
		  "required": false,
		  "choices": [
			"Asia",
			"Australia",
			"Western Europe",
			"North America",
			"Eastern Europe",
			"Latin America",
			"Middle East and Africa"
		  ],
		  "displayAlpha": true,
		  "default": "North America"
		}
	},
	saveField: function (fieldJson) {
		let successMessage = document.getElementById('successMessage')
		let errorMessage = document.getElementById('errorMessage')
			errorMessage.innerText = ''
		
		let updatedLabel = document.getElementById('label').value 
		let updatedRequired = document.getElementById('required').checked 
		let updatedDefault = document.getElementById('default').value
		let updatedChoices = document.getElementById('choiceTextArea').value
		let updatedOrder = document.getElementById('displayAlpha').value

		choiceArray = updatedChoices.split('\n')
		if(!choiceArray.includes(updatedDefault)){
			choiceArray.push(updatedDefault)
		}
		if (updatedOrder === 'true'){
			choiceArray.sort()
		}

		if(updatedLabel === ''){
			errorMessage.innerText = 'Label is required'
		} else if (FieldService.hasDuplicates(choiceArray)){
			errorMessage.innerText = 'Contains duplicate, please remove to save choices'
		} else if(choiceArray.length > 50){
			errorMessage.innerText = 'Choices may not exceed 50, please try again'
		} else if(choiceArray.length  <= 1){
			errorMessage.innerText = 'Choices cannot be blank, please insert minimum of one choice'
		}
		else {
			const url = "http://www.mocky.io/v2/566061f21200008e3aabd919"
			let updatedFields = {
				'label' : updatedLabel,
				'required' : updatedRequired,
				'choices' : choiceArray,
				'displayAlpha' : updatedOrder,
				'default' : updatedDefault
			}
			console.log(updatedFields)

			fetch(url, {
				method : 'post',
				headers : {
					'Content-Type' : 'application/json'
				},
				body: JSON.stringify(updatedFields)
			  })
			.then(response => {
				if (response.ok) return response.json()
			  })
			.then(data => {
				console.log(data)
				successMessage.innerText = data.status = 'Success!' 
			  })
		}
	},
	hasDuplicates: function(arr){
		return (new Set(arr)).size !== arr.length;
	},

	clearForm: function(){
		document.getElementById('label').value = ''
		document.getElementById('required').value = false
		document.getElementById('default').value = ''
		document.getElementById('displayAlpha').value = true
		document.getElementById('choiceTextArea').value = ''
	}
}

let fields = FieldService.getField()
console.log(fields)


let choices = fields.choices
let choiceTextArea = document.getElementById('choiceTextArea');
let displayChoices = choices.join('\n');
choiceTextArea.value = displayChoices;

let label = fields.label
let labelInput = document.getElementById('label');
labelInput.value = label

let required = fields.required
let requiredValue = document.getElementById('required');
requiredValue.checked = required

let defaultValue = fields.default
let defaultInput = document.getElementById('default');
defaultInput.value = defaultValue

let displayAlpha = fields.displayAlpha
let displaySelect = document.getElementById('displayAlpha');
displaySelect.value = displayAlpha 
