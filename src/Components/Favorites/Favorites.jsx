import React from 'react';

function Favorites({ favorites, removeFromFavorites }) {
  console.log('Favorites:', favorites);
    return (
        <div>
            <h2>Favorites Page</h2>
            {favorites && favorites.map((favorite) => (
                <div key={favorite.id}>
                    <p>{favorite.city}</p>
                    <button onClick={() => removeFromFavorites(favorite.id)}>Remove from Favorites</button>
                </div>
            ))}
        </div>
    );
}

export default Favorites;



