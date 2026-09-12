const fs = require('fs');
const path = '/Users/shantanudongre/Casper---Email-Native-AI-Inbox/src/routes/login.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Hide country code and divider if showEmailForm is true
const countryCodeTarget = `{/* Country code selector */}
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer text-sm font-medium"
              >
                <span className="text-lg leading-none">{selectedCountry.flag}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground ml-0.5">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Divider */}
              <div className="h-6 w-[1px] bg-border/60 mx-1" />`;

const countryCodeReplacement = `{/* Country code selector */}
              {!showEmailForm && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer text-sm font-medium"
                  >
                    <span className="text-lg leading-none">{selectedCountry.flag}</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground ml-0.5">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Divider */}
                  <div className="h-6 w-[1px] bg-border/60 mx-1" />
                </>
              )}`;

if (content.includes(countryCodeTarget)) {
  content = content.replace(countryCodeTarget, countryCodeReplacement);
} else {
  console.log("Failed to match country code target");
}

// 2. Change input placeholder and type
const inputTarget = `{/* Phone input */}
              <input
                type="tel"
                placeholder="Enter your number here"
                className="flex-1 bg-transparent border-none outline-none px-3 text-[15px] text-foreground font-medium placeholder:text-muted-foreground/50 w-full min-w-0"
                autoFocus
              />`;

const inputReplacement = `{/* Phone/Email input */}
              <input
                type={showEmailForm ? "email" : "tel"}
                placeholder={showEmailForm ? "Enter your email" : "Enter your number here"}
                className="flex-1 bg-transparent border-none outline-none px-3 text-[15px] text-foreground font-medium placeholder:text-muted-foreground/50 w-full min-w-0"
                autoFocus
              />`;

if (content.includes(inputTarget)) {
  content = content.replace(inputTarget, inputReplacement);
} else {
  console.log("Failed to match input target");
}

// 3. Update the toggle button at the bottom
const toggleTarget = `<button className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-medium">
              Log in with email instead
            </button>`;

const toggleReplacement = `<button 
              type="button"
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {showEmailForm ? "Log in with phone number instead" : "Log in with email instead"}
            </button>`;

if (content.includes(toggleTarget)) {
  content = content.replace(toggleTarget, toggleReplacement);
} else {
  console.log("Failed to match toggle target");
}

fs.writeFileSync(path, content);
console.log("Successfully added toggle logic!");
