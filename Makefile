.PHONY: all clean byte native profile debug test

PKG = opium
OCB_FLAGS = -tag bin_annot -I src -I lib -pkg $(PKG)
OCB = ocamlbuild $(OCB_FLAGS)

all: native byte # profile debug

clean:
	$(OCB) -clean

native:
	$(OCB) main.native

byte:
	$(OCB) main.byte

profile:
	$(OCB) -tag profile main.native

debug:
	$(OCB) -tag debug main.byte

test: native
	./main.native "OCaml" "OCamlBuild" "users"
