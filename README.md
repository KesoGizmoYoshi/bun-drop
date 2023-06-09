# Kom igång...

## Installerar alla nödvändiga paket

```sh
npm install
```

### Startar json-server

```sh
npm run json:server
```

### Kompilerar appen med Hot-Reload

```sh
npm run dev
```

# Använd...

För att kunna använda sidan krävs det att användaren är inloggad; använd den redan skapade användaren **user**/**password** eller registrera en ny användare. En inloggad användare kan sen utforska en gedigen meny, där användaren erbjuds att kunna dynamiskt söka igenom menyn. Varje produkt har en tillhörande produktsida, där användaren kan lägga till produkten till beställningen. På samma sida kan användaren välja att lägga till eller ta bort produkten som favorit. Dessa favoriter kan sedan ses tillsammans på en egen sida, men användarens favoriter kan också ses markerade med stjärna i självaste menyn. När en produkt läggs till i beställningen uppdateras även en räknare i navigeringsfältet. Den uppdateras även så fort en produkt tas bort ifrån beställningen. När man kikar på själva beställning har man möjlighet att ta bort produkter, dock kan betalsidan enbart nås om där finns minst en produkt kvar i beställningen. Bun Drop erbjuder betalkort och Swish som betalningsalternativ. Vid godkänd betalning bekräftas beställningen med en uppskattad leveranstid för användarens beställning. Slutligen så är sidan även anpassad för att användas på både dator och mobiltelefon.

# Redogörelse...

Jag valde Vue 3 för utmaningens skull, appen är skriven med Composition API med en <script setup>-taggar i varje view. Det kändes rimligt att välja Composition API över Options API, då Composition API introducerades i Vue 3. Jag valde <script setup>-tagg över vanliga script-taggar med tillhörande setup-funktion, enbart för att man då inte behöver använda export eller return för att få tillgång till allt i komponentens <template>-tagg.

Jag använder både mig av localStorage och sessionStorage, då jag ville separera data relaterad till användarens inloggnings-session ifrån övrig data knutet till användaren. Övriga data innefattar ett objekt för varje användare med en icke genomförd beställning samt valda favoriter. Det här objektet skapas vid inloggning om det inte redan finns ett sådant objekt i localStorage med användarens username. Vid utloggning töms sessionStorage, detta sker även om användaren bara stänger ner fliken eller webbläsaren.

För att kunna uppdatera min räknare i navigeringsfältet behövde jag skriva en Event Bus, detta var helt inbyggt i Vue 2. Men tyvärr togs stora delar av den här funktionalitet bort när man gick ifrån Vue 2 till Vue 3. Event Bus krävs för att man i en view ska kunna lyssna på något som händer i en annan view. Min Event Bus innehåller två funktioner; en funktion för att trigga när det sker en förändring och en funktion för att lyssna om det sker en förändring. I mitt fall kör jag funktionen för att trigga en förändring, varje gång det sker en förändring i localStorage. I min Header-komponent använder jag sedan funktion för att lyssna på om där sker en ändring mot localStorage. Varje gång det inträffar en förändring hämtar jag sedan storleken på beställningen, för att på så sätt alltid visa den korrekta storleken på beställningen i navigeringsfältet.

Slutligen borde jag även sparat kvantitet för varje produkt i beställningen, för att på ett smidigt kunna erbjuda användaren att enkelt kunna minska eller öka kvantitet för en specifik produkt.
