# Kravanalys med krav-ID

## 1. Syfte och mål

Applikationen ska hjälpa användare att hantera recept, måltidsplanering och ingredienslistor. Den ska vara enkel att använda i en konsolmiljö till en början, och byggas med TypeScript för att säkerställa typkontroll och skalbarhet.

## 2. Funktionella krav

### 2.1 Hantering av recept

- **REQ-001**: Användaren ska kunna lägga till nya recept.
- **REQ-002**: Användaren ska kunna lista alla recept.
- **REQ-003**: Användaren ska kunna ta bort recept baserat på namn.
- **REQ-004** _(Senare)_: Användaren ska kunna söka efter recept baserat på ingredienser.

### 2.2 Måltidsplanering

- **REQ-005**: Användaren ska kunna planera måltider för en dag.
- **REQ-006**: Användaren ska kunna koppla måltider till recept.
- **REQ-007**: Användaren ska kunna se näringsvärden för dagen.
- **REQ-008** _(Senare)_: Användaren ska kunna skapa veckoplanering.

### 2.3 Ingredienshantering

- **REQ-009**: Användaren ska kunna lägga till livsmedel.
- **REQ-010**: Användaren ska kunna söka efter livsmedel.
- **REQ-011**: Användaren ska kunna ändra livsmedel.
- **REQ-012**: Användaren ska kunna ta bort livsmedel.
- **REQ-013** _(Senare)_: Applikationen ska varna om en ingrediens håller på att ta slut.
- **REQ-014** _(Senare)_: Användaren ska kunna visa en lista över ingredienser hemma.
- **REQ-015** _(Senare)_: Användaren ska kunna uppdatera mängder på ingredienser (t.ex. minska vid användning).

### 2.4 Shoppinglista

- **REQ-016**: Applikationen ska kunna generera en lista med ingredienser som behövs för flera dagar.
- **REQ-017** _(Senare)_: Användaren ska kunna exportera shoppinglistan till en fil.

### 2.5 Kalorikalkylator

- **REQ-018**: Applikationen ska beräkna det totala kaloriinnehållet i en måltid baserat på receptens ingredienser.
- **REQ-019**: Applikationen ska beräkna det totala kaloriinnehållet över en dag.
- **REQ-020**: Applikationen ska beräkna det totala kaloriinnehållet över en vecka.
- **REQ-021** _(Senare)_: Användaren ska kunna lägga till egna kaloriuppgifter för ingredienser.

### 2.6 Export och import

- **REQ-022**: Användaren ska kunna exportera och importera recept och måltidsplaner som JSON-filer.
- **REQ-023** _(Senare)_: Applikationen ska stödja import/export av data i andra format, t.ex. CSV.

## 3. Icke-funktionella krav

### 3.1 Användarvänlighet

- **REQ-024**: Applikationen ska ha en enkel och tydlig menystruktur för konsolinteraktion.
- **REQ-025**: Felmeddelanden ska vara informativa och tydliga.

### 3.2 Prestanda

- **REQ-026**: Applikationen ska kunna hantera minst 100 recept utan att prestandan påverkas märkbart.

### 3.3 Skalbarhet

- **REQ-027**: Applikationen ska vara modulär för att enkelt kunna utökas med fler funktioner i framtiden.

### 3.4 Robusthet

- **REQ-028**: Applikationen ska hantera ogiltiga inmatningar utan att krascha.
- **REQ-029**: Data ska sparas och laddas korrekt mellan sessioner.

### 3.5 Tekniska krav

- **REQ-030**: Applikationen ska byggas på:
  - JavaScript
  - TypeScript
  - Jest
  - Coverage (Istanbul)
- **REQ-031**: När ett webbgränssnitt ska skapas, ska React, Next.js och Tailwind användas.
