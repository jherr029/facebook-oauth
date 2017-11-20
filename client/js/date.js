const picker = datepicker("#date", {
    onSelect : function(instance){
        console.log(instance.dateSelected)
    }
})


