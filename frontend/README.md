# FRONT END INSTRUCTIONS

Complete as many items as you can within a reason. If you get stuck, move onto the next item and circle back if needed. There are a few outstanding issues and/or failure to follow best practices with React/Typescript. You can choose to address these first or as you go along.

The basic functionality of this application is to render a list/table of specified data with the ability to display the details of any one of these row items dynamically in a drawer. When a row is selected, drawer should open and display the selected row values in the appropriate input. The Drawer should be closed initially and open when a row is selected. If you have testing experience, please implement at least one expectation on a component of your choice. Listed below are some specifics that can be completed in ANY order you choose.

Material-ui and Emotion have been provided as a dependencies. If you have experience with either of these libraries, implement these in some of your components.
https://mui.com/api/
https://mui.com/components/
https://emotion.sh/docs/introduction

1. Create an Array data set using typescript that includes at least 5 items with the following properties. If you don't have any typescript experience, please let us know.

   - Name with a type of string
   - Viewed with a type of boolean
   - Description with a type of string
   - Status that can be of type new, complete, in progress, on hold or archived

   * Bonus - Create a function that returns a new Data set with the attributes specified above

2. Create a function that mocks an asynchronous get request. This should resolve 2 seconds after the page is initially loaded and return your mock data set. Be sure to indicate a "loading" state to the UI.
    - Another option would be to build out an express server that would return this data for you. [Back end instructions](../backend/README.md)

3. Display your generated data in a list/table, make each item/row clickable. When one of these rows/items are clicked, store this selected value in state.

4. Make the drawer open/close and display the stored state item/row details. The drawer should implement the following functionality. We have provided a few examples as well as some Material-ui components. If you have Material-ui experience, use these comonents, otherwise you can use standard HTML input elemnts.
   https://mui.com/components/text-fields
   https://mui.com/components/drawers
   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input

   - Each input should have an associated label
   - Please incorporate the type of input with based on the values listed below
     - name: input
     - viewed: checkbox
     - description: text area
     - status: radioGroup
   - Allow the drawer to be closed via a button in the Drawer.
   - Display a dynamic title based on the provided data name attribute
   - Update each of these input values via state.

5. Allow the user to save/update any changes.

   - Bonus - mock an api PUT request to find & update the item that has been updated. Return the updated list upon success.

6. Allow the user to be able to create a new list/row item. Do this by adding a button element that opens the drawer with default values and add this item to the list when they save.

   - Bonus - mock an api POST request to add the new item to the list & return the updated list of data upon success.

7. Allow the user to remove a list/row item.

   - Bonus - Mock an api DELETE request to delete the item & return the updated list of data.

- Additional Bonus Items:

  - Validate the form values prior to adding/updating the data. Be sure to indicate an error state when appropriate.
  - Name should not exceed 32 characters
  - Description should not exceed 100 characters
  - Status should not be able to be changed once in a completed state.
  - Update/fix styles utilizing emotion
