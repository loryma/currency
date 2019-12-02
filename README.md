# Currency SPA bult with React

**functionality**

- loads currency rates once an hour
- allows setup base currency for curency rate table
- adding currency to favoutie moves currency to the top of the table
- can convert currencies on convert page
- currency rates, chosed base currency is save into local storage

**implementation**

- built as an SPA with React
- Redux is used for preserving state in the app
- `redux-thunk` is used for dispathing async actions - fetching currency rates, converting currency with requests to web APIs
- React `useState` hook is used for local state in the component, `useEffect` is used for side effects (saving to local storage, fetching data)
- HOC components withLoading, withEror are used to show loading state and modal with error message
