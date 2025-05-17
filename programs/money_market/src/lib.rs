use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

pub mod instructions;
pub mod state;
pub mod errors;
pub mod constants;

use instructions::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod money_market {
    use super::*;

    pub fn initialize_market(
        ctx: Context<InitializeMarket>,
        market_authority: Pubkey,
        market_owner: Pubkey,
    ) -> Result<()> {
        instructions::initialize_market::handler(ctx, market_authority, market_owner)
    }

    pub fn deposit(
        ctx: Context<Deposit>,
        amount: u64,
    ) -> Result<()> {
        instructions::deposit::handler(ctx, amount)
    }

    pub fn borrow(
        ctx: Context<Borrow>,
        amount: u64,
    ) -> Result<()> {
        instructions::borrow::handler(ctx, amount)
    }

    pub fn repay(
        ctx: Context<Repay>,
        amount: u64,
    ) -> Result<()> {
        instructions::repay::handler(ctx, amount)
    }

    pub fn withdraw(
        ctx: Context<Withdraw>,
        amount: u64,
    ) -> Result<()> {
        instructions::withdraw::handler(ctx, amount)
    }

    pub fn liquidate(
        ctx: Context<Liquidate>,
        amount: u64,
    ) -> Result<()> {
        instructions::liquidate::handler(ctx, amount)
    }
}