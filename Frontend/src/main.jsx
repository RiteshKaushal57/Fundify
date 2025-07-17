import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext.jsx'
import { EntrepreneurContextProvider } from './context/entreContext.jsx'
import { BusinessIdeaProvider } from './context/BusinessIdeaContext.jsx'
import { AdvisorContextProvider } from './context/AdvisorContext.jsx'
import { InvestorContextProvider } from './context/InvestorContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <EntrepreneurContextProvider>
        <BusinessIdeaProvider>
          <AdvisorContextProvider>
            <InvestorContextProvider>
              <App />
            </InvestorContextProvider>
          </AdvisorContextProvider>
        </BusinessIdeaProvider>
      </EntrepreneurContextProvider>
    </UserContextProvider>
  </BrowserRouter>,
)
