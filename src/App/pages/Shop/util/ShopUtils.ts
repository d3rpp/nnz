import { CreateOptions } from '@paypal/react-paypal-js';

type MIX = 'chocolate' | 'sweet' | 'savoury';

export class ShopState {
	private _price: number = 6.99;

	private chocolateMixQTY: number;

	private sweetMixQTY: number;

	private savouryMixQTY: number;

	constructor({
		chocolateMix,
		sweetMix,
		savouryMix,
	}: {
		chocolateMix?: number;
		sweetMix?: number;
		savouryMix?: number;
	}) {
		this.chocolateMixQTY = chocolateMix || 0;
		this.sweetMixQTY = sweetMix || 0;
		this.savouryMixQTY = savouryMix || 0;
	}

	/**
	 * Set mix Quanity, used as a singleton editing preventing bullshit in the future
	 *
	 * @param mix The MIX, can be "chocolate", "sweet" or "savoury"
	 * @param quantity The MIX QUANITITY, between 0 and 10
	 * @returns true if completed successfully, otheriwse false
	 */
	public setMixQuantity(mix: MIX, quantity: number): boolean {
		if (quantity > 0 && quantity < 10) {
			switch (mix) {
				case 'chocolate':
					this.chocolateMixQTY = quantity;
					return true;
				case 'sweet':
					this.sweetMixQTY = quantity;
					return true;
				case 'savoury':
					this.savouryMixQTY = quantity;
					return true;
				default:
					return false;
			}
		}
		return false;
	}

	public getMixQuantity(mix: MIX): { quantity: number; valid: boolean } {
		switch (mix) {
			case 'chocolate':
				return { quantity: this.chocolateMixQTY, valid: true };
			case 'sweet':
				return { quantity: this.sweetMixQTY, valid: true };
			case 'savoury':
				return { quantity: this.savouryMixQTY, valid: true };
			default:
				return { quantity: 0, valid: false };
		}
	}

	/**
	 * Gives me a fun time putting paypal stuff together
	 *
	 * @returns something to plug into "@paypal/react-paypal-js"'s method to create an order
	 */
	public convertToPaypalBullshit(): CreateOptions {
		let price: number = this._price;

		return {
			intent: 'CAPTURE',
			purchase_units: [],
		};
	}
}
