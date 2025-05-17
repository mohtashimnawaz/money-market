# Solana Money Market Protocol

A decentralized lending protocol built on Solana, similar to Compound or Aave. This protocol allows users to deposit assets as collateral and borrow other assets against their collateral.

## Features

- Deposit assets to earn interest
- Borrow assets against collateral
- Dynamic interest rates
- Collateral ratio management
- Liquidation mechanism
- Modern web interface

## Prerequisites

- Rust and Cargo
- Solana CLI tools
- Anchor Framework
- Node.js and npm

## Setup

1. Install Solana CLI tools:
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.16.0/install)"
```

2. Install Anchor Framework:
```bash
npm install -g @project-serum/anchor-cli
```

3. Build the program:
```bash
anchor build
```

4. Deploy the program:
```bash
anchor deploy
```

5. Install frontend dependencies:
```bash
cd app
npm install
```

6. Run the frontend:
```bash
npm run dev
```

## Program Structure

- `programs/money_market/src/lib.rs`: Main program logic
  - Market initialization
  - Deposit functionality
  - Borrow functionality
  - Interest rate calculations
  - Collateral management
  - Liquidation mechanism

- `app/`: Frontend application
  - Next.js with TypeScript
  - TailwindCSS for styling
  - Solana wallet integration
  - Supply and borrow interfaces

## Security Considerations

- All arithmetic operations use checked math to prevent overflows
- Collateral ratio requirements are enforced
- Liquidation mechanism to maintain protocol solvency
- Proper access control for administrative functions
- Price oracle integration for accurate asset valuation

## Development

1. Clone the repository
2. Install dependencies
3. Build and deploy the program
4. Run the frontend
5. Connect your Solana wallet
6. Start testing the protocol

## Testing

Run the test suite:
```bash
anchor test
```

## License

MIT 