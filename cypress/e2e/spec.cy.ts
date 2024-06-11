describe('template spec', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login'); 
    });
  
    it('チェックボックスが47個あるか確認する', () => {
      cy.get('input[type="checkbox"]').should('have.length', 47);
    });
  
    it('チェックボックスが全てチェックできるか確認する', () => {
      cy.get('input[type="checkbox"]').each(($el) => {
        cy.wrap($el).check();
      });
  
      cy.get('input[type="checkbox"]').each(($el) => {
        cy.wrap($el).should('be.checked');
      });
    });
  
    it('全て選択した状態でselectタグにある4つのドロップダウン全て選択できるか確認する', () => {
    
        cy.get('input[type="checkbox"]').each(($el) => {
          cy.wrap($el).check();
        });
        
    
        cy.get('input[type="checkbox"]').each(($el) => {
          cy.wrap($el).should('be.checked');
        });
    
        cy.wait(500);

        cy.get('select').each(($el, index) => {
          cy.wrap($el).find('option').should('have.length.greaterThan', 1)
      
          cy.wrap($el).select($el.find('option').eq(1).val());
          cy.wait(1000);
          cy.wrap($el).select($el.find('option').eq(2).val());
          cy.wait(1000);
          cy.wrap($el).select($el.find('option').eq(3).val());
        });
      
        cy.get('select').each(($el) => {
          cy.wrap($el).find(':selected').should('not.have.value', '');
        });
      });
  });
  