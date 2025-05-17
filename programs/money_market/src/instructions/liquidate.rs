use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

use crate::{
    errors::MoneyMarketError,
    state::{
        market::Market,
        obligation::Obligation,
    },
};

#[derive(Accounts)]
pub struct Liquidate<'info> {
    #[account(mut)]
    pub market: Account<'info, Market>,
    
    #[account(
        mut,
        constraint = obligation.market == market.key() @ MoneyMarketError::InvalidObligationMarket,
    )]
    pub obligation: Account<'info, Obligation>,
    
    #[account(mut)]
    pub liquidator_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub market_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub liquidator: Signer<'info>,
    
    pub token_program: Program<'info, Token>,
}

pub fn handler(ctx: Context<Liquidate>, amount: u64) -> Result<()> {
    require!(amount > 0, MoneyMarketError::InvalidAmount);
    
    let market = &mut ctx.accounts.market;
    let obligation = &mut ctx.accounts.obligation;
    
    // Check if position is liquidatable
    require!(
        obligation.borrowed_value > obligation.allowed_borrow_value,
        MoneyMarketError::InvalidLiquidation
    );
    
    // Check if liquidation amount is valid
    require!(
        amount <= obligation.borrowed_value,
        MoneyMarketError::InvalidAmount
    );
    
    // Transfer tokens from liquidator to market
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.liquidator_token_account.to_account_info(),
                to: ctx.accounts.market_token_account.to_account_info(),
                authority: ctx.accounts.liquidator.to_account_info(),
            },
        ),
        amount,
    )?;
    
    // Update market state
    // TODO: Update market liquidity and calculate interest
    
    // Update obligation state
    // TODO: Update obligation borrows and calculate new borrowed value
    
    // Transfer collateral to liquidator
    // TODO: Calculate and transfer collateral based on liquidation bonus
    
    Ok(())
} 