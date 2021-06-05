import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';

function init() {
	const firebaseConfig = {
		apiKey: 'AIzaSyDKNkB0joVDMUtb33MBEp-G1Uv9qHdLjeY',
		authDomain: 'nurturenz-main.firebaseapp.com',
		projectId: 'nurturenz-main',
		storageBucket: 'nurturenz-main.appspot.com',
		messagingSenderId: '656932891414',
		appId: '1:656932891414:web:71258ac3b377e94931fe37',
		measurementId: 'G-GKNL7LYYSW',
	};

	firebase.initializeApp(firebaseConfig);
	// firebase.performance().dataCollectionEnabled = false;

	// TODO: Do i add this?
	// ! NO YOU SHOULD NOT
	// * PLEASE DO NOT UNCOMMENT THIS LINE
	// firebase
	// 	.analytics()
	// 	.logEvent('InitialPageLoad', { userAgent: navigator.userAgent });
}

type MIX = 'chocolate' | 'sweet' | 'savoury';

interface RecipeThumbnail {
	id: string;
	data: RecipeThumbnailData;
}

interface RecipeThumbnailData {
	name: string;
	enabled: boolean;
	fullID: string;
	shortDesc: string;
	thumbnailImage: string;
}

interface Recipe {
	id: string;
	data: RecipeData;
}

interface RecipeData {
	name: string;
	time: string;
	complexity: string;
	servings: string;
	enabled: boolean;
	banner: string;
	description: string;
	ingredients: {
		name: string;
		amount: string;
		unit: string;
		link?: string;
	}[];
	optionalExtras?: {
		name: string;
		amount: string;
		unit: string;
		link?: string;
	}[];
	method: {
		title: string;
		description: string;
		note?: string;
	}[];
}

function getRemoteAsset(path: string) {
	return new Promise<string>((resolve, reject) => {
		firebase
			.storage()
			.refFromURL(path)
			.getDownloadURL()
			.then((value: string | PromiseLike<string>) => {
				resolve(value);
			})
			.catch((reason: any) => reject(reason));
	});
}

function listRecipes(mix: MIX): Promise<RecipeThumbnail[]> {
	return new Promise<RecipeThumbnail[]>((resolve, reject) => {
		let firestore = firebase.firestore();

		if (!['chocolate', 'sweet', 'savoury'].includes(mix)) {
			reject('INVALID MIX SELECTION');
		}

		let collection = firestore.collection(`${mix}-thumb`);
		// .where('enabled', '==', true);

		// console.log('RUNNING QUERY');

		let data: RecipeThumbnail[] = [];

		collection.get().then((snapshot: any) => {
			snapshot.forEach((doc: any) => {
				if (doc.data().enabled == true) {
					data.push({
						id: doc.id,
						data: doc.data() as RecipeThumbnailData,
					});
				}
			});

			resolve(data);
		});
	});
}

function getRecipe(mix: MIX, id: string): Promise<Recipe> {
	return new Promise<Recipe>((resolve, reject) => {
		let firestore = firebase.firestore();

		if (!['chocolate', 'sweet', 'savoury'].includes(mix)) {
			reject('INVALID MIX SELECTION');
		}

		// console.log(`getting /${mix}/${id}`);

		firestore
			.doc(`/${mix}/${id}`)
			.get()
			.then((doc: any) => {
				if (!doc.data()) {
					reject('NOT FOUND');
				}

				if (doc.data()!.enabled) {
					// console.log({ data: doc.data() });
					resolve({ id: doc.id, data: doc.data() as RecipeData });
				}
			});
	});
}

export {
	init,
	listRecipes,
	RecipeThumbnail,
	Recipe,
	getRecipe,
	MIX,
	getRemoteAsset,
};
