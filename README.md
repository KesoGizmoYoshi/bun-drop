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
