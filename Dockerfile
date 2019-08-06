FROM ocaml/opam2:debian-stable

USER opam

RUN sudo apt-get install musl-tools -y
RUN yes | opam switch install 4.07.1+musl+static+flambda
RUN yes |opam update
RUN yes | opam init; yes | eval $(opam env); yes | opam depext ocamlfind ocamlbuild opium
RUN yes | opam init; yes | eval $(opam env); yes | opam install ocamlfind ocamlbuild opium

# Run it
CMD ["bash", "/home/opam/opam-repository/src/setup"]
