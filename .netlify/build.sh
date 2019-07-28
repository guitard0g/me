echo "Downloading dependencies..."

echo "Running opam install script..."
curl -sL https://raw.githubusercontent.com/ocaml/opam/master/shell/install.sh

echo "Installing ocamlbuild..."
opam install ocamlbuild

echo "Finished downloading dependencies."

echo "Starting build..."
make all
echo "Finished build."
