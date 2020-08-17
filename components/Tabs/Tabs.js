// components/Tabs/Tabs.js
Component({
  /**
   * Component properties
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    // onclick
    handleItemTap(e){
      const {index} = e.currentTarget.dataset;
      this.triggerEvent("tabsItemChange",{index});
      
    }

  }
})
